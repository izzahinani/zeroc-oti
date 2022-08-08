import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Loader from "../UI/Loader";
import TableResults from "./TableResults";
import Query from "./Query";

const INITIAL_STATE = {
  current_page: 1,
  last_page: 753,
  total_results: 15051,
  results: [
    {
      access_type: "public",
      activity_id: "accommodation_type_holiday",
      category: "Accommodation",
      constituent_gases: { co2e_total: 0.425, co2e_other: null, co2: null },
      data_quality_flags: [],
      description:
        "Emission intensity of supply chain in GBP spend on: holiday in the uk/ holiday abroad/ room hire. In actual prices in £s and including VAT. Provided by BEIS/DEFRA in the official report on GHG Emissions of the UK between 1996-2018. Where source emission factors are identical across a variety of activities they have been grouped to avoid confusion - details are documented in the OEFDB data guidance.",
      factor: 0.425,
      factor_calculation_method: "ar4",
      factor_calculation_origin: "source",
      id: "accommodation_type_holiday",
      lca_activity: "unknown",
      name: "Holiday (travel/accommodation)",
      region: "GB",
      region_name: "United Kingdom",
      sector: "Restaurants and Accommodation",
      source: "BEIS",
      source_link: "https://www.gov.uk/government/statistics/uks-carbon-footprint",
      supported_calculation_methods: ["ar4"],
      uncertainty: null,
      unit: "kg/GBP",
      unit_type: ["Money"],
      uuid: "5c37ee77-488d-4a21-83d7-7c06656eb0ff",
      year: "2018",
    },
  ],
  possible_filters: {
    category: [""],
    region: [{ id: "", name: "" }],
    sector: [""],
    source: [""],
    unit_type: [""],
    year: [""],
  },
};

const INITIAL_QUERY_STATE = {
  category: [],
  region: [],
  sector: [],
  source: [],
  unit_type: [],
  year: [],
  query: "", //user can append + to search, need to slice
  page: "1",
};

function Datapoints() {
  const [state, setState] = useState(INITIAL_STATE);
  const [checkedResults, setCheckedResults] = useState({}); //{uuid: {...}, {uuid2: {...}, }}
  const [confirmedResults, setConfirmedResults] = useState({});
  const [query, setQuery] = useState(INITIAL_QUERY_STATE);
  const [firstRender, setFirstRender] = useState(true);

  const [ui, setUi] = useState({
    isLoading: false,
    message: {
      type: "", //"success / error"
      message: "",
    },
  });

  // =========================(A) FETCH API ON FIRST LOAD=================================//
  useEffect(() => {
    if (!firstRender) {
      return;
    }
    (async () => {
      try {
        setUi((prev) => ({ ...prev, isLoading: true }));
        const { data } = await axios.get("/api/climatiq/orgadmin/getSearch");
        console.log("data", data);
        setState(data); //to set initial render state
        setUi((prev) => ({ ...prev, isLoading: false, message: { type: "success", message: "Successfully fetched" } }));
      } catch (err) {
        setUi((prev) => ({ ...prev, isLoading: false, message: { type: "error", message: err.message } }));
      }
    })();
  }, []);

  // =========================(B) TO SET TIMEOUT FOR SUCCESS MESSAGE=================================//
  const {
    message: { type },
  } = ui;
  useEffect(() => {
    if (type) {
      const timerPointer = setTimeout(() => {
        setUi((prev) => ({ ...prev, message: { type: "", message: "" } }));
      }, 1000);
      return () => clearTimeout(timerPointer);
    }
  }, [type]);

  // ========================(C) TO handle submit query to backend ==================================//
  const getQueryAPI = useCallback(async () => {
    try {
      setUi((prev) => ({ ...prev, isLoading: true }));
      console.log("query", query);
      const { data } = await axios.post("/api/climatiq/orgadmin/getSearch", {
        body: JSON.stringify(query),
      });
      console.log("data", data);
      setState((prev) => ({
        ...data,
        possible_filters: { ...prev.possible_filters },
      }));
      setUi((prev) => ({ ...prev, isLoading: false, message: { type: "success", message: "Successfully queried" } }));
    } catch (err) {
      setUi((prev) => ({ ...prev, isLoading: false, message: { type: "error", message: err.message } }));
    }
  }, [query, setState, setUi]);

  // =========================USEEFFECT: if detects query, change, call getQueryAPI=================================//
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    const timerPointer = setTimeout(() => getQueryAPI(), [1000]);
    () => clearTimeout(timerPointer);
  }, [query, getQueryAPI]);

  // =========================UI LOADER=================================//
  if (ui.isLoading) {
    return <Loader />;
  }

  return (
    <>
      {ui.message.type && (
        <div style={{ backgroundColor: ui.message.type === "success" ? "green" : "red" }}>
          <p>{ui.message.message}</p>
        </div>
      )}
      <h1>Datapoints</h1>
      <Query setState={setState} setUi={setUi} state={state} query={query} setQuery={setQuery} getQueryAPI={getQueryAPI} />
      {state.results.length === 0 ? (
        <div> NO RESULTS</div>
      ) : (
        <TableResults
          results={state.results}
          checkedResults={checkedResults}
          confirmedResults={confirmedResults}
          setCheckedResults={setCheckedResults}
          setConfirmedResults={setConfirmedResults}
        />
      )}
    </>
  );
}

export default Datapoints;

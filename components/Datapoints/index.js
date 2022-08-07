import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import { isObject } from "../../helper";

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
  // page: "1",
};

function Datapoints() {
  const [state, setState] = useState(INITIAL_STATE);
  const [query, setQuery] = useState(INITIAL_QUERY_STATE);
  const [ui, setUi] = useState({
    isLoading: false,
    message: {
      type: "", //"success / error"
      message: "",
    },
  });
  // =========================(A) FETCH API ON FIRST LOAD=================================//
  useEffect(() => {
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

  // =======================(C) TO handle multiselect +query  text search ===================================//

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "query") {
      setQuery((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }
    //else
    setQuery((prev) => {
      const found = prev[name].find((each) => each === value);
      if (found) {
        return {
          ...prev,
          [name]: [...prev[name].filter((each) => each !== value)],
        };
      } else {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      }
    });
  };
  // ========================(D) TO handle submit query to backend ==================================//
  const submitQuery = async () => {
    try {
      setUi((prev) => ({ ...prev, isLoading: true }));
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuery();
  };

  // ==========================================================//
  const handlePagination = (type) => {
    if (type === "prev" && state.current_page !== 1) {
      setQuery((prev) => ({
        ...prev,
        page: +prev.page - 1,
      }));
      submitQuery();
    } else if (type === "next" && state.current_page + 1 !== state.last_page) {
      setQuery((prev) => ({
        ...prev,
        page: +prev.page + 1,
      }));
      submitQuery();
    }
  };

  // =========================ISCHECKED=================================//
  const isChecked = (category, value) => query[category].includes(value);
  // =========================LOADER=================================//
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
      {JSON.stringify(query)}
      <h1>Datapoints</h1>
      <form onSubmit={handleSubmit}>
        <h2>====================MULTI SELECT DROPDOWN====================</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )", width: "100%" }}>
          {Object.keys(state["possible_filters"]).map((filterCategory) => {
            const filterValues = state["possible_filters"][filterCategory];
            return (
              <div key={filterCategory}>
                <h3>{filterCategory}</h3>
                <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                  {filterValues.map((option) => {
                    if (isObject(option)) {
                      const { id, name } = option;
                      return (
                        <div>
                          <input
                            type="checkbox"
                            defaultChecked={isChecked(filterCategory, id)}
                            id={id}
                            value={id}
                            name={filterCategory}
                            onChange={handleChange}
                          />
                          <label htmlFor={id}>{name}</label>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            defaultChecked={isChecked(filterCategory, option)}
                            id={option}
                            value={option}
                            name={filterCategory}
                            onChange={handleChange}
                          />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <h2>====================SEARCH BY TEXT====================</h2>
        <div style={{ width: "100%" }}>
          <input type="text" placeholder="search..." style={{ width: "80%" }} value={query.query} name="query" onChange={handleChange} />
          <button type="submit">Search</button>
        </div>
      </form>
      <div>
        <h2>====================PAGINATION RESULTS====================</h2>
        <div>
          <button onClick={() => handlePagination("prev")}>Prev</button>
          <p>Current: {state["current_page"]}</p>
          <button onClick={() => handlePagination("next")}>Next</button>
          <p>Last Page: {state["last_page"]}</p>
          <p>Total Results: {state["total_results"]}</p>
        </div>
        <h2>====================RENDERED RESULTS====================</h2>
        <div>
          {state.results.length === 0 ? (
            <div>NO RESULTS</div>
          ) : (
            state.results.map((result, index) => (
              <div key={index} style={{ border: "1px solid black", marginTop: "50px" }}>
                {JSON.stringify(result)}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Datapoints;

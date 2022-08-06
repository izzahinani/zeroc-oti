import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "./dropdown";

function Datapoints() {
  const [state, setState] = useState({});
  const [selected, setSelected] = useState({});
  const [text, setText] = useState("");

  // ==========================================================//
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/climatiq/orgadmin/getAllDropdowns");
        setState(data);
      } catch (err) {
        setState(err.message);
      }
    })();
  }, []);

  // ==========================================================//

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSelected((prev) => {
      const found = prev[name]?.find((each) => each === value);
      if (found) {
        return {
          ...prev,
          [name]: [...prev[name].filter((each) => each !== value)],
        };
      } else if (!prev[name]) {
        return {
          ...prev,
          [name]: [value],
        };
      } else {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      }
    });
  };
  // ==========================================================//
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <h1>Datapoints</h1>
      {JSON.stringify(selected)}
      {JSON.stringify(text)}
      <h2>====================MULTI SELECT DROPDOWN====================</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )" }}>
        {Object.keys(state).map((key) => (
          <div key={key}>
            <h2 htmlFor={key}>{key}</h2>
            <div style={{ height: "150px", overflowY: "auto" }}>
              {state[key].map((option, index) => {
                return isObject(option) ? (
                  <div key={option.id}>
                    <label htmlFor={option.id}>{option.name}</label>
                    <input type="checkbox" id={option.id} value={option.id} name={key} onChange={handleSelectChange} />
                  </div>
                ) : (
                  <div key={index}>
                    <label htmlFor={option}>{option}</label>
                    <input type="checkbox" id={option} value={option} name={key} onChange={handleSelectChange} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <h2>====================SEARCH BY TEXT====================</h2>
      <div>
        <input type="text" placeholder="search..." onChange={handleTextChange} style={{ width: "100%" }} />
      </div>
    </>
  );
}

export default Datapoints;

const isObject = (yourVariable) => {
  return typeof yourVariable === "object" && !Array.isArray(yourVariable) && yourVariable !== null;
};

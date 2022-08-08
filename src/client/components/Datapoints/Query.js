import { useRef } from "react";
import { isObject } from "../../helper";

function Query({ state, query, setQuery, getQueryAPI }) {
  const textRef = useRef(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textRef.current.value;
    if (text.trim() !== "") {
      setQuery((prev) => ({
        ...prev,
        query: text,
      }));
    }
  };

  // ==========================================================//
  const handlePagination = (type) => {
    if (type === "prev" && +state.current_page !== 1) {
      setQuery((prev) => ({
        ...prev,
        page: (+state.current_page - 1).toString(),
      }));
    } else if (type === "next" && +state.current_page + 1 !== state.last_page) {
      setQuery((prev) => ({
        ...prev,
        page: (+state.current_page + 1).toString(),
      }));
    }
  };

  // =========================ISCHECKED=================================//
  const isChecked = (category, value) => query[category].includes(value);

  return (
    <>
      <p>QUERIES: {JSON.stringify(query)}</p>
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
          <input type="text" placeholder="search..." style={{ width: "80%" }} ref={textRef} />
          <button type="submit">Search</button>
        </div>
        <h2>====================PAGINATION====================</h2>
        <div>
          <button type="button" onClick={() => handlePagination("prev")}>
            Prev
          </button>
          <p>Current: {state["current_page"]}</p>
          <button type="button" onClick={() => handlePagination("next")}>
            Next
          </button>
          <p>Last Page: {state["last_page"]}</p>
          <p>Total Results: {state["total_results"]}</p>
        </div>
      </form>
    </>
  );
}

export default Query;

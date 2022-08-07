import { useState } from "react";

const TABLE_HEADERS = ["name", "source", "year", "scope", "unit_type", "sector", "category", "checkbox"];

function TableResults({ results }) {
  const [checkedResults, setCheckedResults] = useState({}); //{uuid: {...}, {uuid2: {...}, }}
  const [confirmedResults, setConfirmedResults] = useState({});

  // ========================= RENDERED TABLE FN =================================//
  const handleCheck = (result) => {
    console.log("result", result);
    setCheckedResults((prev) => {
      const found = Object.keys(checkedResults).find((key) => key === result.uuid);
      if (found) {
        //to uncheck
        return delete prev[result.uuid];
      } else {
        //to check
        return { ...prev, [result.uuid]: { ...result } };
      }
    });
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setConfirmedResults((prev) => ({ ...prev, ...checkedResults }));
    //....
  };

  // ========================= CONFIRMED TABLE FN =================================//
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    //.... api call
  };

  const handleRemove = (uuid) => {
    console.log("uuid", uuid);
    const test = delete confirmedResults[uuid];
    console.log("test", test);

    setConfirmedResults((prev) => delete prev[uuid]);
    setCheckedResults((prev) => delete prev[uuid]);
  };

  // ==============================================ISCHECKED========================================//
  const isChecked = (incomingUUID) => Object.keys(checkedResults).find((eachKey) => eachKey === incomingUUID);

  return (
    <>
      <p>==================== RENDERED TABLE==========================</p>
      {JSON.stringify(checkedResults)}
      <form onSubmit={handleConfirmSubmit}>
        <table>
          {/* // =========================TABLE HEAD ===================== // */}
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          {/* // =========================TABLE BODY ===================== // */}
          <tbody>
            {results.map((result) => {
              const { uuid, name, scope = "", source, year, unit_type, sector, category } = result;
              return (
                <tr key={uuid}>
                  <td>{name}</td>
                  <td>{source}</td>
                  <td>{year}</td>
                  <td>{scope}</td>
                  <td>{unit_type}</td>
                  <td>{sector}</td>
                  <td>{category}</td>
                  <td>
                    <input type="checkbox" defaultChecked={isChecked(uuid)} onChange={() => handleCheck(result)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit">Confirm</button>
      </form>
      <p>==================== CONFIRMED TABLE==========================</p>
      {JSON.stringify(confirmedResults)}
      {Object.keys(confirmedResults).length === 0 ? (
        <div>No confirmed table</div>
      ) : (
        <form onSubmit={handleSaveSubmit}>
          <table>
            {/* // =========================TABLE HEAD ===================== // */}
            <thead>
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            {/* // =========================TABLE BODY ===================== // */}
            <tbody>
              {Object.keys(confirmedResults).map((key) => {
                const { uuid, name, scope = "", source, year, unit_type, sector, category } = confirmedResults[key];
                return (
                  <tr key={uuid}>
                    <td>{name}</td>
                    <td>{source}</td>
                    <td>{year}</td>
                    <td>{scope}</td>
                    <td>{unit_type}</td>
                    <td>{sector}</td>
                    <td>{category}</td>
                    <td>
                      <button type="button" onClick={() => handleRemove(uuid)}>
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      )}
    </>
  );
}
export default TableResults;

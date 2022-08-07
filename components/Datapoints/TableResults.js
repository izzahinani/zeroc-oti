import { useEffect, useState } from "react";

const TABLE_HEADERS = ["name", "source", "year", "scope", "unit_type", "sector", "category", "checkbox"];

function TableResults({ results }) {
  const [checkedResults, setCheckedResults] = useState({}); //{uuid: {...}, {uuid2: {...}, }}
  const [confirmedResults, setConfirmedResults] = useState({});
  // ========================= RENDERED TABLE FN =================================//
  const handleCheck = (result) => {
    const { uuid } = result;
    setCheckedResults(({ [uuid]: value, ...others }) => {
      if (value) {
        //to uncheck
        return others;
      } else {
        //to check
        return { ...others, [uuid]: result };
      }
    });
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setConfirmedResults((prev) => ({ ...prev, ...checkedResults }));
  };

  // ========================= CONFIRMED TABLE FN =================================//
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    //.... api call
  };

  const handleRemove = (uuid) => {
    setConfirmedResults(({ [uuid]: value, ...others }) => {
      return others;
    });
    setCheckedResults(({ [uuid]: value, ...others }) => {
      return others;
    });
  };
  // ==============================================ISCHECKED & isDisabled========================================//
  const isChecked = (uuid) => Object.keys(checkedResults).some((eachKey) => eachKey === uuid);
  const isDisabled = (uuid) => Object.keys(confirmedResults).some((eachKey) => eachKey === uuid);

  return (
    <>
      <h2>==================== RENDERED RESULTS==========================</h2>
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
                    <input type="checkbox" checked={isChecked(uuid)} onChange={() => handleCheck(result)} disabled={isDisabled(uuid)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit">Confirm</button>
      </form>
      <h2>==================== RENDERED CONFIRMED TABLE==========================</h2>

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

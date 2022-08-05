import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});
  // ========================================//
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/test");
      console.log("result xx", data.data.results);
      setData(data.data.results);
    })();
  }, []);

  return (
    <>
      <h1>Dashbord</h1>
      {data && JSON.stringify(data)}
      <h1>The value of customKey is: {process.env.customKey}</h1>
    </>
  );
}

export default Dashboard;

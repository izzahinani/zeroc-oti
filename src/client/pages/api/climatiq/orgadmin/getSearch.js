import axios from "axios";

const BASE_URL = "https://beta3.api.climatiq.io/search";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${process.env.customKey}` },
      });
      res.status(200).json(data);
      return;
    } catch (err) {
      res.status(500).json({ message: err.message || "OMOMOMO! Something went wrong" });
      return;
    }
  } else if (req.method === "POST") {
    try {
      const { body } = req.body; //{"category":[],"region":[],"sector":[],"source":[],"unit_type":[],"year":[],"query":"meep","page":"1"}
      // https://beta3.api.climatiq.io/search?query=light+duty+trucks&year=2021
      const parsedBody = JSON.parse(body);
      const queryArray = Object.keys(parsedBody).reduce((prevArray, currCategory) => {
        if (parsedBody[currCategory].length === 0) {
          return prevArray;
        }
        if (Array.isArray(parsedBody[currCategory])) {
          return [...prevArray, `${currCategory}=${replaceSpaceWithPlus(parsedBody[currCategory].join(","))}`];
        } else {
          return [...prevArray, `${currCategory}=${replaceSpaceWithPlus(parsedBody[currCategory])}`];
        }
      }, []);
      console.log(`${BASE_URL}?${queryArray.join("&")}`);
      const { data } = await axios.get(`${BASE_URL}?${queryArray.join("&")}`, {
        headers: { Authorization: `Bearer ${process.env.customKey}` },
      });
      res.status(200).json(data);
      return;
    } catch (err) {
      res.status(500).json({ message: err.message || "OMOMOMO! Something went wrong" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
}

const replaceSpaceWithPlus = (string) => {
  return string.replaceAll(" ", "+");
};

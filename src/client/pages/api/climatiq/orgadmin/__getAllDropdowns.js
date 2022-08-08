import axios from "axios";

const BASE_URL = "https://beta3.api.climatiq.io/emission-factors/";

const ENDPOINTS = {
  categories: "categories",
  years: "years",
  sectors: "sectors",
  unitTypes: "unit-types",
  sources: "sources",
  regions: "regions",
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      //! TODO To get from DB + check last entry data
      //!...

      //To get dropdown questions from climatiq
      const keys = Object.keys(ENDPOINTS);
      const promisesArray = keys.map(async (key) => await getDropdownDataFromClimatiq(ENDPOINTS[key]));
      let data = {};
      await Promise.all(promisesArray).then(function (results) {
        results.forEach((each, index) => {
          data[keys[index]] = [...Object.keys(each.data.results).map((key) => each.data.results[key])];
        });
      });
      res.status(200).json(data);
      return;
    } catch (err) {
      res.status(500).json({ message: err.message || "Something went wrong" });
    } finally {
      return;
    }
  } else {
    res.status(405).json({ message: "Invalid request method" });
    return;
  }
}

// ======================================================================//

async function getDropdownDataFromClimatiq(endpoint) {
  return axios.get(BASE_URL + endpoint, {
    headers: { Authorization: `Bearer ${process.env.customKey}` },
  });
}

function saveDropdownDataToDB() {}

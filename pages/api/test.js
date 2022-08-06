import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data } = await axios.get("https://beta3.api.climatiq.io/emission-factors/sources?year=2021", {
        headers: { Authorization: `Bearer ${process.env.customKey}` },
      });
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ zmessage: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}

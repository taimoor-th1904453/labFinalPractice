import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const file = await fs.promises.readFile("data/subdivision.json");
      const { country } = req.query;
      let subdivisions = JSON.parse(file);
      subdivisions = subdivisions.filter(
        (sd) => sd.country.toLowerCase() === country.toLowerCase()
      );
      res.status(200).json(subdivisions);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "POST") {
  }
}
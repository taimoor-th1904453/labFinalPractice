import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const file = await fs.promises.readFile("data/flags.json");
      const { alpha2 } = req.query
      const flags = JSON.parse(file);
      
      res.status(200).json(flags[alpha2]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "POST") {
  }
}

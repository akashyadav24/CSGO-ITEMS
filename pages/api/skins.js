import axios from "axios";

const BASE_URL = "https://bymykel.github.io/CSGO-API/api";

export default async function handler(req, res) {
  const query = req.query;
  const { page } = query;

  await axios
    .get(`${BASE_URL}/skins.json`)
    .then(({ data }) => {
      const startIndex = (page - 1) * 25;
      const endIndex = page * 25;

      const items = data.slice(startIndex, endIndex);

      res.status(200).json(items);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}

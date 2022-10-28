import axios from "axios";
import * as Constants from "../../../utils/constants";

const filterByQuery = (data, q) => {
  return data.filter((item) => {
    if (q != null && q?.trim()?.length !== 0) {
      const words = q.match(/[^ ]+/g);

      return words.every((word) => {
        return item.name.toLowerCase().includes(word.toLowerCase());
      });
    }

    return true;
  });
};

export default async function handler(req, res) {
  const query = req.query;
  const { page, type, q } = query;

  const startIndex = (page - 1) * 25;
  const endIndex = page * 25;

  await axios
    .get(`${Constants.BASE_URL}/${type}.json`)
    .then(({ data }) => {
      const filtered = filterByQuery(data, q);
      const items = filtered.slice(startIndex, endIndex);

      res.status(200).json(items);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}

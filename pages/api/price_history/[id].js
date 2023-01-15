import { getItemOnSCM } from "scm-price-history";

export default async function handler(req, res) {
  const query = req.query;
  const { name } = query;

  await getItemOnSCM(name, "730").then((item) => {
    // console.log(item);
    // console.log(item.getItemInfo()); // Returns item information
    // console.log(item.getPriceHistory()); // Returns price history
    // console.log(item.getPriceSnapshots()); // Returns price snapshots

    res.status(200).json(item.getPriceHistory());
  });
}

import { getItemOnSCM } from "scm-price-history";

export default async function handler(req, res) {
  const query = req.query;
  const { name } = query;

  await getItemOnSCM(name, "730").then((item) => {
    const priceHistory = item.getPriceHistory() || {};
    const priceHistoryArray = Object.values(priceHistory).map((item) => {
      return {
        time: new Date(parseInt(item.time)).toLocaleDateString('en-GB'),
        value: parseFloat(item.value.toFixed(2)),
        volume: item.volume,
      };
    });

    res.status(200).json(priceHistoryArray);
  });
}

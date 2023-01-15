import axios from "axios";
import * as Constants from "../../../utils/constants";
import cacheData from "memory-cache";

const types = {
  agents: "agent",
  skins: "skin",
  collectibles: "collectible",
  crates: "crate",
  stickers: "sticker",
  collections: "collection",
  graffiti: "graffiti",
  sprays: "spray",
  keys: "key",
  patches: "patch",
  "music-kits": "music-kit",
};

const subtypes = {
  cases: "case",
  capsules: ["sticker capsule", "patch capsule", "pins"],
  graffiti: "graffiti",
  patches: "patch capsule",
  pins: ["pins", "pin"],
  music_kit_boxes: "music kit box",
  souvenir: "souvenir",
  major: [
    "tournament finalist trophy",
    "old pick'em trophy",
    "fantasy trophy",
    "pick'em coin",
  ],
  operation: ["operation coin", "stars for operation"],
  map_coins: "map contributor coin",
  service_medals: "service medal",
};

const filterData = (data, options) => {
  const { q, type, subtype, page } = options;

  const filtered = Object.entries(data).filter(([key, item]) => {
    if (
      type != null &&
      !item.id.split("-").slice(0, -1).join("-").includes(types[type])
    ) {
      return false;
    }

    if (
      (subtype != null || item?.type == null) &&
      (Array.isArray(subtypes[subtype])
        ? !subtypes[subtype].includes(item?.type?.toLowerCase())
        : item?.type?.toLowerCase() !== subtypes[subtype])
    ) {
      return false;
    }

    if (q != null && q?.trim()?.length !== 0) {
      const words = q.match(/[^ ]+/g);

      return words.every((word) => {
        return item.name.toLowerCase().includes(word.toLowerCase());
      });
    }

    return true;
  });

  if (page != null) {
    const startIndex = (page - 1) * 25;
    const endIndex = page * 25;

    return filtered.slice(startIndex, endIndex).map(([key, value]) => value);
  }

  return Object.fromEntries(filtered);
};

export default async function handler(req, res) {
  const query = req.query;
  const { page, type, subtype, q } = query;

  const value = cacheData.get(`${Constants.BASE_URL}/all.json`);

  if (value) {
    res.status(200).json(filterData(value, query));
    return;
  }

  await axios
    .get(`${Constants.BASE_URL}/all.json`)
    .then(({ data }) => {
      cacheData.put(`${Constants.BASE_URL}/all.json`, data, 86400000);
      res.status(200).json(filterData(data, query));
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}

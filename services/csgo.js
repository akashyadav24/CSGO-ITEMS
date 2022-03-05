import axios from "axios";

const BASE_URL = "https://bymykel.me/CSGO-API/api";

export const getSkins = async () => {
  return await axios.get(`${BASE_URL}/skins.json`);
};

export const getCrates = async (type = undefined) => {
  if (type !== "capsules") {
    const file = type === undefined ? "/crates.json" : `/crates/${type}.json`;
    return await axios.get(`${BASE_URL}${file}`);
  }

  const capsules = { data: [] };

  await axios
    .get(`${BASE_URL}/crates/capsules/stickers.json`)
    .then((response) => {
      capsules.data.push(...response.data);
    });

  await axios.get(`${BASE_URL}/crates/capsules/pins.json`).then((response) => {
    capsules.data.push(...response.data);
  });

  await axios
    .get(`${BASE_URL}/crates/capsules/patches.json`)
    .then((response) => {
      capsules.data.push(...response.data);
    });

  return capsules;
};

export const getStickers = async () => {
  return await axios.get(`${BASE_URL}/stickers.json`);
};

export const getCollections = async () => {
  return await axios.get(`${BASE_URL}/collections.json`);
};

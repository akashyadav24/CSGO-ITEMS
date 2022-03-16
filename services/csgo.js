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

export const getCollectibles = async (type = undefined) => {
  if (type !== "major" && type !== "operation") {
    const file =
      type === undefined ? "/collectibles.json" : `/collectibles/${type}.json`;
    return await axios.get(`${BASE_URL}${file}`);
  }

  if (type === "major") {
    const major = { data: [] };

    await axios
      .get(`${BASE_URL}/collectibles/major/finalists_trophies.json`)
      .then((response) => {
        major.data.push(...response.data);
      });

    await axios
      .get(`${BASE_URL}/collectibles/major/pickem_old.json`)
      .then((response) => {
        major.data.push(...response.data);
      });

    await axios
      .get(`${BASE_URL}/collectibles/major/fantasy_trophies.json`)
      .then((response) => {
        major.data.push(...response.data);
      });

    await axios
      .get(`${BASE_URL}/collectibles/major/pickem_coins.json`)
      .then((response) => {
        major.data.push(...response.data);
      });

    return major;
  }

  if (type === "operation") {
    const operation = { data: [] };

    await axios
      .get(`${BASE_URL}/collectibles/operation/coins.json`)
      .then((response) => {
        operation.data.push(...response.data);
      });

    await axios
      .get(`${BASE_URL}/collectibles/operation/stars.json`)
      .then((response) => {
        operation.data.push(...response.data);
      });

    return operation;
  }
};

export const getAgents = async () => {
  return await axios.get(`${BASE_URL}/agents.json`);
};

export const getGraffiti = async () => {
  return await axios.get(`${BASE_URL}/graffiti.json`);
};

export const getKeys = async () => {
  return await axios.get(`${BASE_URL}/keys.json`);
};

export const getPatches = async () => {
  return await axios.get(`${BASE_URL}/patches.json`);
};

export const getMusicKits = async () => {
  return await axios.get(`${BASE_URL}/music_kits.json`);
};

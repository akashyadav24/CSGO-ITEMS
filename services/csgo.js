import axios from "axios";

const BASE_URL = "https://bymykel.me/CSGO-API/api";

export const getSkins = async () => {
  return await axios.get(`${BASE_URL}/skins.json`);
};

export const getCrates = async () => {
  return await axios.get(`${BASE_URL}/crates.json`);
};

import axios from "axios";

const BASE_URL = "https://bymykel.github.io/CSGO-API/api";

export const getAllItems = async () => {
  return axios.get(`${BASE_URL}/all.json`);
};

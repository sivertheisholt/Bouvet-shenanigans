import axios from "axios";

const BASE_URL = process.env.REACT_APP_ADMIN_BASEURL;
const API_KEY = process.env.API_KEY!;

export const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ApiKey: API_KEY,
  },
});

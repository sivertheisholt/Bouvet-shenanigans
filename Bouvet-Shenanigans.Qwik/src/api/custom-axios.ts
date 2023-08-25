import { server$ } from "@builder.io/qwik-city";
import axios from "axios";

export const customAxios = server$(() => {
  const BASE_URL = process.env.REACT_APP_ADMIN_BASEURL;
  const API_KEY = process.env.API_KEY;
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ApiKey: API_KEY,
    },
  });
});

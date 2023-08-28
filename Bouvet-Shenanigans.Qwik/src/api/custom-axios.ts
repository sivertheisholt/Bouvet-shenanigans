import axios from "axios";

export const customAxios = () => {
  return axios.create({
    baseURL: process.env.FARMFRESH_BASEURL,
    headers: {
      "Content-Type": "application/json",
      ApiKey: process.env.API_KEY,
    },
  });
};

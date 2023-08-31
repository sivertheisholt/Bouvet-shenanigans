import axios from "axios";

export const customClientAxios = () => {
  return axios.create({
    baseURL: import.meta.env.PUBLIC_FARMFRESH_BASEURL,
    headers: {
      "Content-Type": "application/json",
      ApiKey: import.meta.env.PUBLIC_API_KEY,
    },
  });
};

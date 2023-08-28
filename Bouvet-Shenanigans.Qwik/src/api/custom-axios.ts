import axios from "axios";

export const customAxios = () => {
  return axios.create({
    baseURL: import.meta.env.PUBLIC_FARMFRESH_BASEURL,
    headers: {
      "Content-Type": "application/json",
      ApiKey: import.meta.env.PUBLIC_API_URL,
    },
  });
};

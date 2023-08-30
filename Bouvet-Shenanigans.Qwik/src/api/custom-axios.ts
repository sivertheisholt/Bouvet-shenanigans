import axios from "axios";

export const customAxios = (token: string, baseUrl: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      ApiKey: token,
    },
  });
};

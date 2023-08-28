import axios from "axios";

export const customAxios = () => {
  return axios.create({
    baseURL: "https://bouvetfarmfresh.azurewebsites.net/",
    headers: {
      "Content-Type": "application/json",
      ApiKey: "5ba28a1c-3c70-4d6d-9147-8ff195380b5e",
    },
  });
};

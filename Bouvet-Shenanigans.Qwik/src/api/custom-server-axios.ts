import type { RequestEventLoader } from "@builder.io/qwik-city";
import axios from "axios";

export const customServerAxios = (
  requestEvent: RequestEventLoader<QwikCityPlatform>
) => {
  return axios.create({
    baseURL: requestEvent.env.get("FARMFRESH_BASEURL"),
    headers: {
      "Content-Type": "application/json",
      ApiKey: requestEvent.env.get("API_KEY"),
    },
  });
};

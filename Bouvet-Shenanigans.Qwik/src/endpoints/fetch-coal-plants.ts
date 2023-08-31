import type { RequestEventLoader } from "@builder.io/qwik-city";
import { CustomServerAxiosInstance } from "./custom-server-fetcher";

export const fetchCoalPlants = async (
  requestEvent: RequestEventLoader<QwikCityPlatform>
) => {
  const axiosInstance = new CustomServerAxiosInstance(requestEvent);
  return await axiosInstance.instance
    .get(`api/electricity/coal`)
    .then((resp: any) => {
      return resp.data;
    });
};

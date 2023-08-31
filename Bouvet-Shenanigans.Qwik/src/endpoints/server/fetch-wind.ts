import type { RequestEventLoader } from "@builder.io/qwik-city";
import { CustomServerAxiosInstance } from "../custom-server-fetcher";

export const fetchWind = async (
  requestEvent: RequestEventLoader<QwikCityPlatform>
) => {
  const axiosInstance = new CustomServerAxiosInstance(requestEvent);
  return await axiosInstance.instance
    .get(`api/electricity/wind`)
    .then((resp: any) => {
      return resp.data;
    });
};

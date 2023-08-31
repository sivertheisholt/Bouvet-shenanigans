import type { RequestEventLoader } from "@builder.io/qwik-city";
import { CustomServerAxiosInstance } from "../custom-server-fetcher";

export const fetchSolar = async (
  requestEvent: RequestEventLoader<QwikCityPlatform>
) => {
  const axiosInstance = new CustomServerAxiosInstance(requestEvent);
  return await axiosInstance.instance
    .get(`api/electricity/solar`)
    .then((resp: any) => {
      return resp.data;
    });
};

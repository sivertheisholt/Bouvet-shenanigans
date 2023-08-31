import type { RequestEventLoader } from "@builder.io/qwik-city";
import { CustomServerAxiosInstance } from "../custom-server-fetcher";

export const fetchFactories = async (
  requestEvent: RequestEventLoader<QwikCityPlatform>
) => {
  const axiosInstance = new CustomServerAxiosInstance(requestEvent);
  return await axiosInstance.instance.get(`api/factories`).then((resp: any) => {
    return resp.data;
  });
};

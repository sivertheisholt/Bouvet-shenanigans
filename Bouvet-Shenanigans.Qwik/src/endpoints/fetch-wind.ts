import { customAxios } from "~/api/custom-axios";

export const fetchWind = async (token: string, baseUrl: string) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient
    .get(`api/electricity/wind`)
    .then((resp: any) => {
      return resp.data;
    });
};

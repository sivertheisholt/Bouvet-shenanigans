import { customAxios } from "~/api/custom-axios";

export const fetchSolar = async (token: string, baseUrl: string) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient
    .get(`api/electricity/solar`)
    .then((resp: any) => {
      return resp.data;
    });
};

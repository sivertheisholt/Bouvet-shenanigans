import { customAxios } from "~/api/custom-axios";

export const fetchCoalPlants = async (token: string, baseUrl: string) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient
    .get(`api/electricity/coal`)
    .then((resp: any) => {
      return resp.data;
    });
};

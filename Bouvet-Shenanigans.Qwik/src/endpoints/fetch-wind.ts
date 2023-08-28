import { customAxios } from "~/api/custom-axios";

export const fetchWind = async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient
    .get(`api/electricity/wind`)
    .then((resp: any) => {
      return resp.data;
    });
};

import { customAxios } from "~/api/custom-axios";

export const fetchWind = async () => {
  return await customAxios.get(`api/electricity/wind`).then((resp: any) => {
    return resp.data;
  });
};

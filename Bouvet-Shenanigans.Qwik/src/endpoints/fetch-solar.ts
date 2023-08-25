import { customAxios } from "~/api/custom-axios";

export const fetchSolar = async () => {
  return await customAxios.get(`api/electricity/solar`).then((resp: any) => {
    return resp.data;
  });
};

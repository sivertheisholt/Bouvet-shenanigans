import { customAxios } from "~/api/custom-axios";

export const fetchCoalPlants = async () => {
  return await customAxios.get(`api/electricity/coal`).then((resp: any) => {
    return resp.data;
  });
};

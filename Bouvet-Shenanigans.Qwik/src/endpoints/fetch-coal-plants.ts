import { customAxios } from "~/api/custom-axios";

export const fetchCoalPlants = async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient
    .get(`api/electricity/coal`)
    .then((resp: any) => {
      return resp.data;
    });
};

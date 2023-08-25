import { customAxios } from "~/api/custom-axios";

export const fetchFactories = async () => {
  return await customAxios.get(`api/factories`).then((resp: any) => {
    return resp.data;
  });
};

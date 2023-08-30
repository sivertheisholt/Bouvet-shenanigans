import { customAxios } from "~/api/custom-axios";

export const fetchFactories = async (token: string, baseUrl: string) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient.get(`api/factories`).then((resp: any) => {
    return resp.data;
  });
};

import { customAxios } from "~/api/custom-axios";

export const startFactory = async (
  id: number,
  token: string,
  baseUrl: string
) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient
    .patch(`api/factories/activate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
};

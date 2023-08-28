import { customAxios } from "~/api/custom-axios";

export const startFactory = async (id: number) => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient
    .patch(`api/factories/activate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
};

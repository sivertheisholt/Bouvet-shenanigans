import { customAxios } from "~/api/custom-axios";

export const startFactory = async (id: number) => {
  return await customAxios
    .patch(`api/factories/activate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
};

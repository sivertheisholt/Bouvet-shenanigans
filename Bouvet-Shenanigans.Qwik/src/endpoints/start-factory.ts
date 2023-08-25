import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const startFactory = server$(async (id: number) => {
  return await customAxios
    .patch(`api/factories/activate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
});

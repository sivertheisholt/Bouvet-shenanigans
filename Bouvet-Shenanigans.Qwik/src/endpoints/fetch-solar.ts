import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchSolar = server$(async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient
    .get(`api/electricity/solar`)
    .then((resp: any) => {
      return resp.data;
    });
});

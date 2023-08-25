import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchWind = server$(async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient
    .get(`api/electricity/wind`)
    .then((resp: any) => {
      return resp.data;
    });
});

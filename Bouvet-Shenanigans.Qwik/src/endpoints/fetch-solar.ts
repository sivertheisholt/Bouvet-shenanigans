import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchSolar = server$(async () => {
  return await customAxios.get(`api/electricity/solar`).then((resp: any) => {
    return resp.data;
  });
});

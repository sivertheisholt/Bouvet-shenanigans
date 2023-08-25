import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchWind = server$(async () => {
  return await customAxios.get(`api/electricity/wind`).then((resp: any) => {
    return resp.data;
  });
});

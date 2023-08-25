import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchFactories = server$(async () => {
  return await customAxios.get(`api/factories`).then((resp: any) => {
    return resp.data;
  });
});

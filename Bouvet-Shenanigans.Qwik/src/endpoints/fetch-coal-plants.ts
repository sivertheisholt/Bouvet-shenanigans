import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchCoalPlants = server$(async () => {
  return await customAxios.get(`api/electricity/coal`).then((resp: any) => {
    return resp.data;
  });
});

import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchUser = server$(async () => {
  return await customAxios.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
});

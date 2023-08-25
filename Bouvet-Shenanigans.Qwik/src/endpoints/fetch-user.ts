import { server$ } from "@builder.io/qwik-city";
import { customAxios } from "~/api/custom-axios";

export const fetchUser = server$(async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
});

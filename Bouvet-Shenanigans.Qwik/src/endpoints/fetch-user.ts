import { customAxios } from "~/api/custom-axios";

export const fetchUser = async () => {
  return await customAxios.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
};

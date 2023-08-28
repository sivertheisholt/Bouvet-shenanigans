import { customAxios } from "~/api/custom-axios";

export const fetchUser = async () => {
  const customAxiosClient = await customAxios();
  return await customAxiosClient.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
};

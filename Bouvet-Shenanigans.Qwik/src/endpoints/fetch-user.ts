import { customAxios } from "~/api/custom-axios";

export const fetchUser = async (token: string, baseUrl: string) => {
  const customAxiosClient = customAxios(token, baseUrl);
  return await customAxiosClient.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
};

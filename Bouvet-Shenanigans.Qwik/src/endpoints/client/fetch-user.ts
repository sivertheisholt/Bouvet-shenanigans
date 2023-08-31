import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const fetchUser = async (
) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance.get(`api/users`).then((resp: any) => {
    return resp.data;
  });
};

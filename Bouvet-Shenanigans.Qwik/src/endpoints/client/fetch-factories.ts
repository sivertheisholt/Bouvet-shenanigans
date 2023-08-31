import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const fetchFactories = async (
) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance.get(`api/factories`).then((resp: any) => {
    return resp.data;
  });
};

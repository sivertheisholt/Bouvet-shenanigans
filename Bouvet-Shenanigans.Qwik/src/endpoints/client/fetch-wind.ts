import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const fetchWind = async (
) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance
    .get(`api/electricity/wind`)
    .then((resp: any) => {
      return resp.data;
    });
};

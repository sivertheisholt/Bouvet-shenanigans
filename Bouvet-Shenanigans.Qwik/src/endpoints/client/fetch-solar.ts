import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const fetchSolar = async (
) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance
    .get(`api/electricity/solar`)
    .then((resp: any) => {
      return resp.data;
    });
};

import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const startFactory = async (id: number) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance
    .patch(`api/factories/activate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
};

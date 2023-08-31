import { CustomClientAxiosInstance } from "../custom-client-fetcher";

export const stopFactory = async (id: number) => {
  const axiosInstance = new CustomClientAxiosInstance();
  return await axiosInstance.instance
    .patch(`api/factories/deactivate?id=` + id)
    .then((resp: any) => {
      return resp.data;
    });
};

import { AxiosInstance } from "axios";
import { TokenManager } from "../Types/TokenManager";

export const interceptToken = (
  tokenManager: TokenManager,
  axiosInstance: AxiosInstance
) => {
  const requestIntercept = axiosInstance.interceptors.request.use(
    (config: any) => {
      config.headers["Authorization"] = `Bearer ${tokenManager?.code}`;
      return config;
    },
    (error: any) => Promise.reject(error)
  );
  return () => {
    axiosInstance.interceptors.request.eject(requestIntercept);
  };
};
import { AxiosInstance } from "axios"

export const interceptToken = (token: string, axiosInstance: AxiosInstance) => {
	const requestIntercept = axiosInstance.interceptors.request.use(
		(config: any) => {
			config.headers["api-key"] = `${token}`
			return config
		},
		(error: any) => Promise.reject(error)
	)
	return () => {
		axiosInstance.interceptors.request.eject(requestIntercept)
	}
}

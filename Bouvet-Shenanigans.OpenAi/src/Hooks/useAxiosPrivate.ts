import { useEffect } from "react"
import { axiosPrivate } from "../Api/CustomAxios"
import { interceptToken } from "../Interceptors/axiosInterceptor"

export const useAxiosPrivate = () => {
	const token = process.env.REACT_APP_CHATGPT_API_TOKEN!
	useEffect(() => {
		interceptToken(token, axiosPrivate)
	})

	return axiosPrivate
}

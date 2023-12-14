import { useEffect } from "react"
import { axiosPrivate } from "../Api/CustomAxios"
import { interceptToken } from "../Interceptors/axiosInterceptor"

export const useAxiosPrivate = () => {
	// This is not a safe approach, as it will leak token.
	// This is just for demo and there is a very small billing limit, so you wont get much out of stealing this.
	// I regularly delete tokens when demo is over
	const token = process.env.REACT_APP_CHATGPT_API_TOKEN!
	useEffect(() => {
		interceptToken(token, axiosPrivate)
	})

	return axiosPrivate
}

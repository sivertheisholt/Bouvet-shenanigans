import { useEffect } from "react"
import { axiosRetrivalPrivate } from "../Api/CustomAxiosRetrieval"
import { interceptToken } from "../Interceptors/axiosInterceptor"

export const useAxiosRetrievalPrivate = () => {
	// This is not a safe approach, as it will leak token.
	// This is just for demo and there is a very small billing limit, so you wont get much out of stealing this.
	// I regularly delete tokens when demo is over
	const token = process.env.REACT_APP_CHATGPT_RETRIEVAL_TOKEN!
	useEffect(() => {
		interceptToken(token, axiosRetrivalPrivate)
	})

	return axiosRetrivalPrivate
}

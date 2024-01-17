import { customAxiosApi } from "../Api/CustomAxiosApi"

export const useAxiosApi = () => {
	// This is not a safe approach, as it will leak token.
	// This is just for demo and there is a very small billing limit, so you wont get much out of stealing this.
	// I regularly delete tokens when demo is over
	return customAxiosApi
}

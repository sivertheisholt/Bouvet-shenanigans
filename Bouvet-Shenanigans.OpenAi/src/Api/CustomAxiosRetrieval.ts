import axios from "axios"

const BASE_URL =
	"https://gptretrieval.delightfulocean-dd136fd3.swedencentral.azurecontainerapps.io"

export const axiosRetrivalPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

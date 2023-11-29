import axios from "axios"

const BASE_URL = "https://api.openai.com/v1"

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer",
	},
})

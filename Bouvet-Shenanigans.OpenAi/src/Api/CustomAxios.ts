import axios from "axios"

const BASE_URL = "https://api.openai.com/v1/chat/completions"

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

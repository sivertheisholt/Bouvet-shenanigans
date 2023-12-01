import axios from "axios"

const BASE_URL =
	"https://bouvetshenanigansopenai-aiservices243105851.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2023-07-01-preview"

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

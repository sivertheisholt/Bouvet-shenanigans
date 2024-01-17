import axios from "axios"

const BASE_URL = process.env.REACT_APP_BOUVET_SHENANIGANS_BASEURL!

export const customAxiosApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

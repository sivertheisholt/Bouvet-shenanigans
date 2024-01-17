import { useAxiosApi } from "./useAxiosApi"
import { GenerateToken } from "../Types/Hooks/GenerateToken"
import { useQuery } from "@tanstack/react-query"

export const useGetEmbedToken = () => {
	const axiosClient = useAxiosApi()
	return useQuery<GenerateToken, any>([`powerb`], () =>
		axiosClient.get(`powerb`).then((resp) => resp.data)
	)
}

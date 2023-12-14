import { useMutation } from "@tanstack/react-query"
import { useAxiosRetrievalPrivate } from "./useAxiosRetrievalPrivate"
import { RetrievalUpsertDto } from "../Types/Hooks/RetrievalUpsertDto"
import { RetrievalQueryResponseDto } from "../Types/Hooks/RetrievalQueryResponseDto"
import { RetrievalQueryDto } from "../Types/Hooks/RetrievalQueryDto"

export const useUpsert = () => {
	const axiosClient = useAxiosRetrievalPrivate()
	return useMutation(
		async (upsertDto: RetrievalUpsertDto) =>
			await axiosClient.post("/upsert", upsertDto).then((resp: any) => resp)
	)
}

export const useQuery = () => {
	const axiosClient = useAxiosRetrievalPrivate()
	return useMutation(
		async (queryDto: RetrievalQueryDto) =>
			await axiosClient
				.post("/query", queryDto)
				.then((resp: any) => resp.data as RetrievalQueryResponseDto)
	)
}

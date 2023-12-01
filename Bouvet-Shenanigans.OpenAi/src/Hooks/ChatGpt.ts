import { useMutation } from "@tanstack/react-query"
import { useAxiosPrivate } from "./useAxiosPrivate"
import { ChatGptResponseDto } from "../Types/Hooks/ChatGptResponseDto"

export const useChatGpt = () => {
	const axiosClient = useAxiosPrivate()
	return useMutation(
		async (messages: string) =>
			await axiosClient
				.post("", messages)
				.then((resp: any) => resp.data as ChatGptResponseDto)
	)
}

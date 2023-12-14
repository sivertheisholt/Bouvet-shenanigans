import React, { useCallback, useState } from "react"
import { Header } from "../Components/Header"
import { UsernameInput } from "../Components/ChatRobot/UsernameInput"
import { Chat } from "../Components/ChatRobot/Chat"
import { ChatMessage } from "../Types/ChatRobot/ChatMessage"
import { useQuery, useUpsert } from "../Hooks/ChatGptRetrieval"
import { RetrievalQueryDto } from "../Types/Hooks/RetrievalQueryDto"
import { RetrievalUpsertDto } from "../Types/Hooks/RetrievalUpsertDto"
import { getCurrentDateTime } from "../Helpers/DateHelper"
import { useChatGpt } from "../Hooks/ChatGpt"

export interface ChatRobotPageProps {}

const ChatRobotPageComponent = (props: ChatRobotPageProps) => {
	const [username, setUsername] = useState("")
	const [messages, setMessages] = useState<Array<ChatMessage>>([])
	const useRetrievalQuery = useQuery()
	const useRetrievalUpsert = useUpsert()
	const getChat = useChatGpt()

	const addMessage = useCallback((message: ChatMessage) => {
		setMessages((prevMessages) => [...prevMessages, message])
	}, [])

	const sendPrompt = async (prompt: string) => {
		const date = new Date()

		addMessage({ author: username, message: prompt, created_at: Date.now().toString() })

		const upsertDto: RetrievalUpsertDto = {
			documents: [
				{
					metadata: {
						author: username,
						created_at: date.toISOString(),
						source: "chat",
					},
					text: prompt,
				},
			],
		}
		await useRetrievalUpsert.mutateAsync(upsertDto)

		const queryDto: RetrievalQueryDto = {
			queries: [
				{
					query: prompt,
					filter: {
						author: username,
						source: "chat",
						source_id: "",
					},
					top_k: 5,
				},
			],
		}

		var queryResult = await useRetrievalQuery.mutateAsync(queryDto)
		console.log(queryResult)

		const context = `
			Context:
			${JSON.stringify(queryResult.results)}

			Prompt:

		`
		let finalPrompt = context + prompt

		let jsonString: string = JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: finalPrompt }],
		})

		const res = await getChat.mutateAsync(jsonString)
		const gptResponse = res.choices[0].message.content
		addMessage({ author: "bot", message: gptResponse, created_at: Date.now().toString() })
		console.log(messages)
	}

	return (
		<div className="wrapper">
			<Header />
			{username == "" ? (
				<div
					style={{ height: "calc(100% - 50px)" }}
					className="d-flex flex-column justify-content-center"
				>
					<UsernameInput setUsername={setUsername} />
				</div>
			) : (
				<Chat username={username} messages={messages} sendPrompt={sendPrompt} />
			)}
		</div>
	)
}

export const ChatRobotPage = React.memo(ChatRobotPageComponent)

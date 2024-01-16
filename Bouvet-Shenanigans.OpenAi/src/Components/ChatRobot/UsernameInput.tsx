import React, { useState } from "react"
import { useQuery } from "../../Hooks/ChatGptRetrieval"
import { RetrievalQueryDto } from "../../Types/Hooks/RetrievalQueryDto"
import { useChatGpt } from "../../Hooks/ChatGpt"

export interface UsernameInputProps {
	setUsername: (username: string) => unknown
	startChat: (value: string) => unknown
}

const UsernameInputComponent = ({ setUsername, startChat }: UsernameInputProps) => {
	const getChat = useChatGpt()
	const [value, setValue] = useState("")

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	const startChatHandler = async () => {
		const context = `
			You are gona reply like a human would do and not like an AI. Your personality should be nice, curious and excited. You shall never reply with anything that sounds robotic in any way. 
			The Context provides information aobut the user you are talking to, if they have a history.

			Prompt:
      Hi there!
		`
		let finalPrompt = context

		let jsonString: string = JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: finalPrompt }],
		})

		const res = await getChat.mutateAsync(jsonString)
		const gptResponse = res.choices[0].message.content
		startChat(gptResponse)
		setUsername(value)
	}

	return (
		<div className="d-flex flex-column align-items-center">
			<h1>Enter username:</h1>
			<input
				type="text"
				className="form-control w-75"
				placeholder="Username"
				aria-label="Username"
				aria-describedby="basic-addon1"
				onChange={onInputChange}
				value={value}
			/>
			<button
				onClick={startChatHandler}
				type="button"
				className="btn btn-primary mt-3 w-75"
			>
				Start
			</button>
		</div>
	)
}

export const UsernameInput = React.memo(UsernameInputComponent)

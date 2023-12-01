export type ChatGptResponseDto = {
	id: string
	created: number
	model: string
	object: string
	choices: Array<ChatGptResponseChoiceDto>
}

type ChatGptResponseChoiceDto = {
	finished_reason: string
	index: number
	message: {
		role: string
		content: string
		function_call: {
			name: string
			arguments: string
		}
	}
}

import React, { useState } from "react"
import { ChatGptResponseSchemaDto } from "../Types/Hooks/ChatGptResponseSchemaDto"
import { useChatGpt } from "../Hooks/ChatGpt"
import { SpeechRecognitionWrapper } from "../Components/SpeechRecognitionWrapper"
import { AccidentForm } from "../Components/AccidentForm"
import { BeatLoader } from "react-spinners"
import { categories } from "../Static/categories"
import { Header } from "../Components/Header"

export interface AccidentPageProps {}

const AccidentPageComponent = (props: AccidentPageProps) => {
	const getChat = useChatGpt()

	const [isRecording, setIsRecording] = useState(false)
	const [transcript, setTranscript] = useState("")
	const [isLoadingData, setIsLoadingData] = useState(false)
	const [data, setData] = useState<ChatGptResponseSchemaDto>({
		categoryId: 0,
		summary: "",
		subCategoryId: 0,
	})

	const isDoneRecording = () => {
		setIsRecording(false)
		sendChat()
	}

	const question = `
		Din jobb er å velge riktig kategorier ved å bruke brukerinput. Du skal velge både hovedkategori og subKategori som passer. 
		Du skal også gjøre en oppsummering av input fra brukeren. 
		Dersom du ikke finner passende kategori, så setter du id til 0. 
		Dette er følgende eksisterende informasjon:
		${JSON.stringify(categories)}

		Kall funksjonen "fillForm".

		Brukerinput: 
	`

	const sendChat = async () => {
		setIsLoadingData(true)
		let finalQuestion =
			question +
			(transcript == ""
				? "Systemet har brent ned og har problem med oppstart på grunn av varme. Kan være på grunn av vifte har stoppet."
				: transcript)

		let jsonString: string = JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: finalQuestion }],
			functions: [
				{
					name: "fillForm",
					parameters: {
						type: "object",
						properties: {
							categoryId: {
								type: "integer",
							},
							subCategoryId: {
								type: "integer",
							},
							summary: {
								type: "string",
							},
						},
						required: ["categoryId", "subCategoryId", "summary"],
					},
				},
			],
			function_call: { name: "fillForm" },
		})

		try {
			const res = await getChat.mutateAsync(jsonString)
			const functionCall = res.choices[0].message.function_call
			const json = JSON.parse(functionCall.arguments) as ChatGptResponseSchemaDto
			setData(json)
		} catch (err) {
			console.log("Could not parse respond: " + err)
		}

		setIsLoadingData(false)
	}

	if (isLoadingData) {
		return <BeatLoader className="position-absolute top-50 start-50 translate-middle" />
	}

	return (
		<div className="wrapper">
			<Header />
			{isRecording ? (
				<SpeechRecognitionWrapper
					isRecording={isRecording}
					isDoneCb={isDoneRecording}
					setTranscript={setTranscript}
				/>
			) : (
				<AccidentForm data={data} setIsRecording={setIsRecording} />
			)}
		</div>
	)
}

export const AccidentPage = React.memo(AccidentPageComponent)

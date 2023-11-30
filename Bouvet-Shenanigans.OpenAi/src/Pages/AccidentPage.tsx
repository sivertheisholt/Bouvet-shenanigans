import React, { useState } from "react"
import { ChatGptResponseSchemaDto } from "../Types/Hooks/ChatGptResponseSchemaDto"
import { useChatGpt } from "../Hooks/ChatGpt"
import { SpeechRecognitionWrapper } from "../Components/SpeechRecognitionWrapper"
import { AccidentForm } from "../Components/AccidentForm"
import { BeatLoader } from "react-spinners"
import { categories } from "../Static/categories"

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
		KUN RESPONDER MED JSON!
		Din jobb er å velge riktig kategorier ved å bruke brukerinput. Du skal velge både hovedkategori og subKategori som passer. Du skal også oppsummere input fra brukere. Dersom du ikke finner passende kategori, så setter du id til 0. Dette er følgende eksisterende informasjon:
		${JSON.stringify(categories)}

		Returner med følgende JSON format:
		{
			"categoryId":  <value here>,
			"subCategoryId": <value here>,
			"summary": <value here>
		}

		Brukerinput: 
	`

	const sendChat = async () => {
		setIsLoadingData(true)
		let finalQuestion =
			question +
			(transcript == ""
				? "Systemet har brent ned og har problem med oppstart på grunn av varme"
				: transcript)

		let jsonString: string = JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: finalQuestion }],
		})
		const res = await getChat.mutateAsync(jsonString)
		const resObj = JSON.parse(res.choices[0].message.content) as ChatGptResponseSchemaDto
		setData(resObj)
		setIsLoadingData(false)
	}

	if (isLoadingData) {
		return <BeatLoader className="position-absolute top-50 start-50 translate-middle" />
	}

	return (
		<div className="wrapper">
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

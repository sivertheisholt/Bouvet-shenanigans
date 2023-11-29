import React, { useState } from "react"
import { ChatGptResponseSchemaDto } from "../Types/Hooks/ChatGptResponseSchemaDto"
import { useChatGpt } from "../Hooks/ChatGpt"
import { SpeechRecognitionWrapper } from "../Components/SpeechRecognitionWrapper"
import { AccidentForm } from "../Components/AccidentForm"
import { BeatLoader, DotLoader } from "react-spinners"

export interface AccidentPageProps {}

const AccidentPageComponent = (props: AccidentPageProps) => {
	const getChat = useChatGpt()

	const [isRecording, setIsRecording] = useState(false)
	const [transcript, setTranscript] = useState("")
	const [isLoadingData, setIsLoadingData] = useState(false)
	const [data, setData] = useState<ChatGptResponseSchemaDto>({
		categoryId: 0,
		summary: "",
	})

	const isDoneRecording = () => {
		setIsRecording(false)
		sendChat()
	}

	const question = `
		KUN RESPONDER MED JSON!
		Din jobb er å velge riktig kategori ved å bruke brukerinput. Du skal også oppsummere input fra brukere. Dette er følgende eksisterende informasjon:
		{
			"categories": {
				"funksjonelleFeil": {
					"id": 1,
					"description": "Omhandler feilaktige eller defekte funksjoner og integrasjonsproblemer."
				},
				"ytelsesFeil": {
					"id": 2,
					"description": "Innebærer treg ytelse, lav gjennomstrømning og høyt ressursforbruk."
				},
				"brukbarhetsFeil": {
					"id": 3,
					"description": "Fokuserer på brukergrensesnittproblemer, dårlig brukeropplevelse og tilgjengelighetsproblemer."
				},
				"sikkerhetsFeil": {
					"id": 4,
					"description": "Gjelder uautorisert tilgang, datasikkerhetsproblemer og ikke-overholdelse av sikkerhetsstandarder."
				},
				"pålitelighetsFeil": {
					"id": 5,
					"description": "Relatert til hyppige systemkrasj, datatap eller inkonsekvens, og redundansproblemer."
				},
				"kompatibilitetsFeil": {
					"id": 6,
					"description": "Innebærer problemer på tvers av forskjellige systemer, programvarekonflikter og miljøspesifikke problemer."
				},
				"skalerbarhetsFeil": {
					"id": 7,
					"description": "Omhandler systemets manglende evne til å håndtere økt belastning eller ytelsesnedgang under skalering."
				},
				"vedlikeholdsFeil": {
					"id": 8,
					"description": "Fokuserer på utfordringer med å oppdatere systemer, dårlig dokumentasjon og høy teknisk gjeld."
				},
				"regulatoriskeOverholdelsesFeil": {
					"id": 9,
					"description": "Innebærer ikke-overholdelse av juridiske eller bransjestandarder og personvernproblemer."
				},
				"miljømessigeFeil": {
					"id": 10,
					"description": "Gjelder feil på grunn av fysiske forhold, maskinvareproblemer og infrastrukturproblemer som strøm eller tilkoblingsproblemer."
				}
			}
		}
		Returner med følgende JSON format:
		{
			"categoryId":  <value here>,
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

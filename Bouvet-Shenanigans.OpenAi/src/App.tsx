import { useState } from "react"
import "./App.css"
import { Button } from "./Components/Button"
import { Select } from "./Components/Select"
import { TextInput } from "./Components/TextInput"
import { useChatGpt } from "./Hooks/ChatGpt"
import { categories } from "./Static/categories"
import { ChatGptResponseSchemaDto } from "./Types/Hooks/ChatGptResponseSchemaDto"
import { SpeechRecognitionWrapper } from "./Components/SpeechRecognitionWrapper"

function App() {
	const getChat = useChatGpt()

	const [selectedCategory, setSelectedCategory] = useState<number>(0)
	const [data, setData] = useState<ChatGptResponseSchemaDto>()
	const [summary, setSummary] = useState<string>("")
	const [isRecording, setIsRecording] = useState(false)
	const [transcript, setTranscript] = useState("")
	const [isLoadingData, setIsLoadingData] = useState(false)

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
		Return json format:

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

		console.log(finalQuestion)
		let jsonString: string = JSON.stringify({
			model: "gpt-4",
			messages: [{ role: "user", content: finalQuestion }],
		})
		const res = await getChat.mutateAsync(jsonString)
		console.log(res)
		const resObj = JSON.parse(res.choices[0].message.content) as ChatGptResponseSchemaDto
		setData(resObj)
		setIsLoadingData(false)
	}

	if (isLoadingData) {
		return <>Loading data</>
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
				<div className="px-5 py-3">
					<h1>Hva har skjedd?</h1>
					<div className="mt-4 alert alert-info" role="alert">
						Bruk tale til tekst funksjonen så vil systemet foreslå riktig kategori og lage
						en oppsummert beskrivelse
					</div>
					<div>
						<Button onClick={() => setIsRecording(true)} title="Start tale til tekst" />
					</div>

					<div className="pt-4">
						<Select
							selectedId={data ? data.categoryId : 0}
							items={categories.categories.map((cat) => {
								return {
									displayName: cat.displayName,
									id: cat.id,
								}
							})}
						/>
					</div>

					<div className="pt-4">
						<TextInput value={data ? data.summary : ""} />
					</div>
					<div className="pt-4">
						<Button title="Start på nytt" />
						<Button title="Lagre" />
					</div>
				</div>
			)}
		</div>
	)
}

export default App

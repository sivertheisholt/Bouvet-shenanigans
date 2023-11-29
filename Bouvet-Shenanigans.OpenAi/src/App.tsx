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
		ONLY RESPOND WITH JSON!
		Your job is to choose the right category using the user input. You shoud also summerize the input from user. The following is existing information:
		{
			"categories": {
				"functionalFailures": {
					"id": 1,
					"description": "Deals with incorrect or malfunctioning features and integration problems."
				},
				"performanceFailures": {
					"id": 2,
					"description": "Involves slow performance, low throughput, and high resource usage."
				},
				"usabilityFailures": {
					"id": 3,
					"description": "Focuses on user interface issues, poor user experience, and accessibility problems."
				},
				"securityFailures": {
					"id": 4,
					"description": "Concerns unauthorized access, data security issues, and non-compliance with security standards."
				},
				"reliabilityFailures": {
					"id": 5,
					"description": "Related to frequent system crashes, data loss or inconsistency, and redundancy issues."
				},
				"compatibilityFailures": {
					"id": 6,
					"description": "Involves issues across different systems, software conflicts, and environment-specific problems."
				},
				"scalabilityFailures": {
					"id": 7,
					"description": "Deals with the system's inability to handle increased load or performance degradation under scale."
				},
				"maintainabilityFailures": {
					"id": 8,
					"description": "Focuses on challenges in updating systems, poor documentation, and high technical debt."
				},
				"regulatoryComplianceFailures": {
					"id": 9,
					"description": "Involves non-compliance with legal or industry standards and privacy issues."
				},
				"environmentalFailures": {
					"id": 10,
					"description": "Concerns failures due to physical conditions, hardware issues, and infrastructure problems like power or connectivity."
				}
			}
		}
		Return json format:

		{
			"categoryId":  <value here>,
			"summary": <value here>
		}

		User input: 
	`

	const sendChat = async () => {
		setIsLoadingData(true)
		let finalQuestion = question + transcript
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
					<div className="mt-2 alert alert-info" role="alert">
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
				</div>
			)}
		</div>
	)
}

export default App

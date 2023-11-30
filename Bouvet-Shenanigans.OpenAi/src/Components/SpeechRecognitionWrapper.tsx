import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"
import { url } from "inspector"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	setTranscript: (transcript: string) => unknown
	isDoneCb: () => unknown
}

const SpeechRecognitionWrapperComponent = ({
	setTranscript,
	isDoneCb,
}: SpeechRecognitionWrapperProps) => {
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition()

	useEffect(() => {
		setTranscript(transcript)
	}, [transcript])

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	const stopRecording = () => {
		SpeechRecognition.stopListening()
		isDoneCb()
	}

	const startListening = (event: any) => {
		event.preventDefault()
		SpeechRecognition.startListening({ continuous: true, language: "nb-NO" })
	}
	const stopListening = () => SpeechRecognition.stopListening()

	const handleContextMenu = (event: any) => {
		event.preventDefault()
	}

	return (
		<div>
			<h1 style={{ textAlign: "center" }} className=" pt-2 fs-2">
				Hold for å aktivere
			</h1>
			<div
				onMouseDown={startListening}
				onMouseUp={stopListening}
				onTouchStart={startListening}
				onTouchEnd={stopListening}
			>
				<img
					onContextMenu={handleContextMenu}
					className="pt-4"
					style={{
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
						zIndex: -1,
					}}
					width="30%"
					src={
						listening ? "./images/microphone-open.png" : "./images/microphone-closed.png"
					}
				/>
			</div>

			<h1
				style={{ textAlign: "center" }}
				className=" mt-4 fs-2 text-decoration-underline"
			>
				Resultat
			</h1>
			<p>{transcript}</p>

			<div style={{ textAlign: "center" }} className="pt-4">
				<Button className="fs-5 me-2" onClick={stopRecording} title="Ferdig" />
				<Button className="fs-5" onClick={resetTranscript} title="Start på nytt" />
			</div>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

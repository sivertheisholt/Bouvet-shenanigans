import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	setTranscript: (transcript: string) => unknown
	isDoneCb: () => unknown
}

const SpeechRecognitionWrapperComponent = ({
	isRecording,
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

	if (isRecording) {
		SpeechRecognition.startListening({
			continuous: true,
			language: "nb-NO",
		})
	}

	const stopRecording = () => {
		SpeechRecognition.stopListening()
		isDoneCb()
	}

	return (
		<div>
			<p>Microphone: {listening ? "on" : "off"}</p>
			<Button onClick={stopRecording} title="Ferdig" />
			<Button onClick={resetTranscript} title="Start på nytt" />
			<Button title="Avbryt" />
			<p>{transcript}</p>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

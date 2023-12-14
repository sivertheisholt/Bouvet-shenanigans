import { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"
import useWhisper from "@chengsokdara/use-whisper"
import { BeatLoader } from "react-spinners"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	setTranscript: (transcript: string) => unknown
	isDoneCb: () => unknown
}

const SpeechRecognitionWrapperComponent = ({
	setTranscript,
	isDoneCb,
}: SpeechRecognitionWrapperProps) => {
	const { browserSupportsSpeechRecognition } = useSpeechRecognition()

	const {
		recording,
		speaking,
		transcript,
		transcribing,
		pauseRecording,
		startRecording,
		stopRecording,
	} = useWhisper({
		apiKey: process.env.REACT_APP_CHATGPT_API_TOKEN,
		removeSilence: true,
		whisperConfig: {
			language: "no",
		},
	})

	useEffect(() => {
		if (transcript.text != undefined) setTranscript(transcript.text)
	}, [transcript.text])

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	const stopRecordingHandler = async () => {
		await stopRecording()
		isDoneCb()
	}

	return (
		<div className="d-flex flex-column align-items-center p-2">
			<h5>{recording ? "Innspilling..." : "Venter..."}</h5>
			<h1 className="pt-2 fs-2">
				{recording ? "Trykk for å pause" : "Trykk for å starte innspilling"}
			</h1>
			<div onClick={recording ? pauseRecording : startRecording}>
				<img
					className="pt-4"
					style={{
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
						zIndex: -1,
					}}
					width="40%"
					src={
						recording ? "./images/microphone-open.png" : "./images/microphone-closed.png"
					}
				/>
			</div>

			<div style={{ textAlign: "center" }} className="fs-5 w-75 border border-dark mt-5">
				{transcribing ? (
					<BeatLoader />
				) : transcript.text != undefined ? (
					transcript.text
				) : (
					"Tale til tekst..."
				)}
			</div>

			<Button className="fs-5 me-2 w-75 mt-5" onClick={stopRecording} title="Konverter" />
			<Button
				className="fs-5 me-2 w-75 mt-5"
				onClick={stopRecordingHandler}
				title="Ferdig"
			/>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

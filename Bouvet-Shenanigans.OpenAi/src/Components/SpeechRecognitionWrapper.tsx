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
		timeSlice: 1_000, // 1 second
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

	const startListening = (event: any) => {
		event.preventDefault()
		startRecording()
	}

	const stopListening = () => pauseRecording()

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
						recording ? "./images/microphone-open.png" : "./images/microphone-closed.png"
					}
				/>
			</div>

			<h1
				style={{ textAlign: "center" }}
				className=" mt-4 fs-2 text-decoration-underline"
			>
				Status
			</h1>
			{transcribing && (
				<div style={{ textAlign: "center" }} className="pt-4">
					<BeatLoader />
				</div>
			)}

			<p>{transcript.text}</p>

			<div style={{ textAlign: "center" }} className="pt-4">
				<Button className="fs-5 me-2" onClick={stopRecording} title="Konverter" />
				<Button className="fs-5 me-2" onClick={stopRecordingHandler} title="Ferdig" />
			</div>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

import { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"
import useWhisper from "@chengsokdara/use-whisper"

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

	const { recording, transcript, transcribing, startRecording, stopRecording } =
		useWhisper({
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
		<div className="h-100 d-flex flex-column align-items-center p-2">
			{transcribing ? (
				<h1 className="position-absolute top-50 start-50 translate-middle">
					Prosesserer tekst...
				</h1>
			) : (
				<>
					{recording ? (
						<>
							<h1 className="pt-2 fs-2">Snakk nå...</h1>
							<Button
								className="fs-5 me-2 w-75 mt-5"
								onClick={stopRecordingHandler}
								title="Stopp"
							/>
							<Button
								className="fs-5 me-2 w-75 mt-5"
								onClick={stopRecording}
								title="Begynn på nytt"
							/>
						</>
					) : (
						<Button
							className="fs-5 me-2 w-75 mt-5"
							onClick={startRecording}
							title="Start"
						/>
					)}
				</>
			)}
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

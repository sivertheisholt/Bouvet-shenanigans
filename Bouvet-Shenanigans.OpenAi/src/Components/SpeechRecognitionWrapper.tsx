import { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import { useEffect } from "react"
import useWhisper from "@chengsokdara/use-whisper"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	isDoneCb: (transcript: string) => unknown
}

const SpeechRecognitionWrapperComponent = ({
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
		if (transcript.text != undefined) {
			isDoneCb(transcript.text)
		}
	}, [transcript.text])

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	const stopRecordingHandler = async () => {
		stopRecording()
	}

	return (
		<div
			style={{ height: "calc(100% - 50px)" }}
			className="d-flex flex-row align-items-center p-2"
		>
			<div className="flex-grow-1 d-flex flex-column align-items-center">
				{transcribing ? (
					<></>
				) : (
					<>
						{recording ? (
							<>
								<h1 className="fs-2">Snakk nå...</h1>
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
							<Button className="fs-5 me-2 w-75" onClick={startRecording} title="Start" />
						)}
					</>
				)}
			</div>
		</div>
	)
}

export const SpeechRecognitionWrapper = SpeechRecognitionWrapperComponent

import { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "./Button"
import useWhisper from "@sivertheisholt/use-whisper"
import { useEffect, useState } from "react"

export interface SpeechRecognitionWrapperProps {
	isRecording: boolean
	isDoneCb: (transcript: string) => unknown
}

const SpeechRecognitionWrapperComponent = ({
	isDoneCb,
}: SpeechRecognitionWrapperProps) => {
	const { browserSupportsSpeechRecognition } = useSpeechRecognition()
	let [isDone, setIsDone] = useState(false)

	const {
		recording,
		transcript,
		transcribing,
		startRecording,
		stopRecording,
		resetTranscript,
	} = useWhisper({
		apiKey: process.env.REACT_APP_CHATGPT_API_TOKEN,
		removeSilence: true,
		whisperConfig: {
			language: "no",
		},
	})

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	useEffect(() => {
		if (transcript.text != undefined && isDone) isDoneCb(transcript.text)
	}, [transcript.text])

	const stopRecordingHandler = async () => {
		setIsDone(true)
		await stopRecording()
	}

	const restart = async () => {
		await stopRecording()
		resetTranscript()
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
									onClick={restart}
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

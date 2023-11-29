import React, { useEffect, useRef, useState } from "react"
import { Button } from "./Button"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

export interface SpeakRecordingProps {
	isDone: (state: boolean) => unknown
	isCancel: (state: boolean) => unknown
}

const SpeakRecordingComponent = ({}: SpeakRecordingProps) => {
	const { transcript, resetTranscript } = useSpeechRecognition()
	const [isListening, setIsListening] = useState(false)
	const microphoneRef = useRef(null)
	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return (
			<div className="mircophone-container">
				Browser is not Support Speech Recognition.
			</div>
		)
	}
	const handleListing = () => {
		setIsListening(true)
		SpeechRecognition.startListening({
			continuous: true,
		})
	}
	const stopHandle = () => {
		setIsListening(false)
		SpeechRecognition.stopListening()
	}
	const handleReset = () => {
		stopHandle()
		resetTranscript()
	}
	return (
		<div className="microphone-wrapper">
			<div className="mircophone-container">
				<div
					className="microphone-icon-container"
					ref={microphoneRef}
					onClick={handleListing}
				>
					<img
						className={isListening ? "listening microphone-icon" : "microphone-icon"}
					/>
				</div>
				<div className="microphone-status">
					{isListening ? "Listening........." : "Click to start Listening"}
				</div>
				{isListening && (
					<button className="microphone-stop btn" onClick={stopHandle}>
						Stop
					</button>
				)}
			</div>
			{transcript && (
				<div className="microphone-result-container">
					<div className="microphone-result-text">{transcript}</div>
					<button className="microphone-reset btn" onClick={handleReset}>
						Reset
					</button>
				</div>
			)}
		</div>
	)
}

export const SpeakRecording = React.memo(SpeakRecordingComponent)

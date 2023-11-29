import React, { useRef, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

export interface SpeakRecordingProps {
	isDone: (state: boolean) => unknown
	isCancel: (state: boolean) => unknown
}

const SpeakRecordingComponent = ({}: SpeakRecordingProps) => {
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition()

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	return (
		<div>
			<p>Microphone: {listening ? "on" : "off"}</p>
			<button
				onClick={() =>
					SpeechRecognition.startListening({
						continuous: true,
					})
				}
			>
				Start
			</button>
			<button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
			<button onClick={resetTranscript}>Reset</button>
			<p>{transcript}</p>
		</div>
	)
}

export const SpeakRecording = SpeakRecordingComponent

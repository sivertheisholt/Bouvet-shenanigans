import React, { useState } from "react"

export interface UsernameInputProps {
	setUsername: (username: string) => unknown
}

const UsernameInputComponent = ({ setUsername }: UsernameInputProps) => {
	const [value, setValue] = useState("")
	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}
	return (
		<div className="d-flex flex-column align-items-center">
			<h1>Enter username:</h1>
			<input
				type="text"
				className="form-control w-75"
				placeholder="Username"
				aria-label="Username"
				aria-describedby="basic-addon1"
				onChange={onInputChange}
				value={value}
			/>
			<button
				onClick={() => setUsername(value)}
				type="button"
				className="btn btn-primary mt-3 w-75"
			>
				Start
			</button>
		</div>
	)
}

export const UsernameInput = React.memo(UsernameInputComponent)

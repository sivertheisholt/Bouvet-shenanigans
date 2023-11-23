import React from "react"

export interface TextInputProps {}

const TextInputComponent = (props: TextInputProps) => {
	return (
		<div className="input-group">
			<textarea className="form-control" aria-label="With textarea"></textarea>
		</div>
	)
}

export const TextInput = React.memo(TextInputComponent)

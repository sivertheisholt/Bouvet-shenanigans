import React from "react"

export interface TextInputProps {
	value?: string
	onChange?: () => unknown
}

const TextInputComponent = ({ value = "", onChange = () => {} }: TextInputProps) => {
	return (
		<div className="input-group">
			<textarea
				value={value}
				className="form-control"
				aria-label="With textarea"
			></textarea>
		</div>
	)
}

export const TextInput = React.memo(TextInputComponent)

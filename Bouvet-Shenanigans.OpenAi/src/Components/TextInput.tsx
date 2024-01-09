import React from "react"

export interface TextInputProps {
	value?: string
	onChange?: () => unknown
	className?: string
}

const TextInputComponent = ({
	value = "",
	onChange = () => {},
	className = "",
}: TextInputProps) => {
	className += " form-control"
	return (
		<textarea
			style={{ height: "120px" }}
			value={value}
			className={className}
			onChange={onChange}
			aria-label="With textarea"
		/>
	)
}

export const TextInput = React.memo(TextInputComponent)

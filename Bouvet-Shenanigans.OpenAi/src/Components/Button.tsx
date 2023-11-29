import React from "react"

export interface ButtonProps {
	title: string
	onClick?: () => unknown
}

const ButtonComponent = ({ title, onClick = () => {} }: ButtonProps) => {
	return (
		<button onClick={onClick} className="btn btn-primary">
			{title}
		</button>
	)
}

export const Button = React.memo(ButtonComponent)

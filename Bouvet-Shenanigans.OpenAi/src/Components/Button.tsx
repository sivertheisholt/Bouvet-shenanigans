import React from "react"

export interface ButtonProps {
	title: string
	onClick?: () => unknown
	className?: string
}

const ButtonComponent = ({ title, onClick = () => {}, className = "" }: ButtonProps) => {
	className += " btn btn-primary"
	return (
		<button className={className} onClick={onClick}>
			{title}
		</button>
	)
}

export const Button = React.memo(ButtonComponent)

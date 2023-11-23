import React from "react"

export interface ButtonProps {
	title: string
}

const ButtonComponent = ({ title }: ButtonProps) => {
	return <button className="btn btn-primary">{title}</button>
}

export const Button = React.memo(ButtonComponent)

import React from "react"

export interface HeaderProps {}

const HeaderComponent = (props: HeaderProps) => {
	return (
		<div className="w-100 bg-dark d-flex flex-row justify-content-center align-items-center">
			<h1 className="fs-2 text-light me-2">Bouvet</h1>
			<img height="50px" src="./icon192.png" />
			<h1 className="fs-2 text-light ms-2">Shenanigans</h1>
		</div>
	)
}

export const Header = React.memo(HeaderComponent)

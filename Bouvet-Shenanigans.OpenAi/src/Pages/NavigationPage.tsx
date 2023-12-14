import React from "react"
import { Link } from "react-router-dom"
import { Header } from "../Components/Header"

export interface NavigationPageProps {}

const NavigationPageComponent = (props: NavigationPageProps) => {
	return (
		<div className="wrapper">
			<Header />
			<div
				style={{ height: "calc(100% - 50px)" }}
				className="d-flex flex-column align-items-center justify-content-center"
			>
				<div className="w-75 border border-3 border-primary text-center">
					<Link
						style={{ display: "block", textDecoration: "none", color: "black" }}
						className="fs-1"
						to="/chatrobot"
					>
						Chat robot
					</Link>
				</div>
				<div className="w-75 border border-3 border-primary mt-5 text-center">
					<Link
						style={{ display: "block", textDecoration: "none", color: "black" }}
						className="fs-1"
						to="/formFiller"
					>
						Skjema fyller
					</Link>
				</div>
			</div>
		</div>
	)
}

export const NavigationPage = React.memo(NavigationPageComponent)

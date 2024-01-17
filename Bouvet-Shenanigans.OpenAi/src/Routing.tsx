import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavigationPage } from "./Pages/NavigationPage"
import { AccidentPage } from "./Pages/AccidentPage"
import { ChatRobotPage } from "./Pages/ChatRobotPage"
import { PowerTestPage } from "./Pages/PowerTestPage"

export interface RoutingProps {}

const RoutingComponent = (props: RoutingProps) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavigationPage />} />
				<Route path="/formfiller" element={<AccidentPage />} />
				<Route path="/chatrobot" element={<ChatRobotPage />} />
				<Route path="/powerb" element={<PowerTestPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export const Routing = React.memo(RoutingComponent)

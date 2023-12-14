import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export interface RoutingProps {}

const RoutingComponent = (props: RoutingProps) => {
	return (
		<BrowserRouter>
			<Routes></Routes>
		</BrowserRouter>
	)
}

export const Routing = React.memo(RoutingComponent)

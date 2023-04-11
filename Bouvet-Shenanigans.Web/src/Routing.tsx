import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Forecasts } from "./Pages/Forecasts"
import { Index } from "./Pages/Index"

export interface RoutingProps {
    
}

const RoutingComponent = (props: RoutingProps) => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path={"/"}
                        element={<Index/>}
                    />
                    <Route
                        path={"/forecast"}
                        element={<Forecasts/>}
                    />
                </Routes>
            </BrowserRouter>
    )

}

export const Routing = React.memo(RoutingComponent)
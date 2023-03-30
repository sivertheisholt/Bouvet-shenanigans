import React from "react"

export interface ForecastsProps {
    date: Date,
    tempC: number,
    tempF: number
    
}

const ForecastsComponent = (props: ForecastsProps) => {
    
    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export const Forecasts = React.memo(ForecastsComponent)



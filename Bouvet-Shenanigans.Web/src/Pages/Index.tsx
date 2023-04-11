import React from "react"
import NavComponent from "../Components/Nav/NavComponent"

const IndexComponent = () => {
    return (
        <div>
            <NavComponent/>
        </div>
    )
}

export const Index = React.memo(IndexComponent)
import React, { useState } from "react"
import { Routing } from "./Routing"
import AuthContextProvider from "./Context/AuthContextProvider"



const AppComponent = () => {
    let [ isAuthenticated, setAuthenticated ] = useState(false);
    

    return <Routing/>
}

export const App = React.memo(AppComponent)
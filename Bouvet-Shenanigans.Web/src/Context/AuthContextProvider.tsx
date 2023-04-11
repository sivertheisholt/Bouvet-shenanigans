import React from "react"
import { createContext, useState } from "react"
import { TokenManager } from "../Types/TokenManager"

interface AuthContextValues {
	tokenManager: TokenManager | null
}

/**
 * defaultAuthContextValues defines the default values
 */
const defaultAuthContextValues: AuthContextValues = {
	tokenManager: null,
}

/**
 * AuthContext is the context exposed
 */
export const AuthContext = createContext<AuthContextValues>(defaultAuthContextValues)

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: { children: JSX.Element }) => {
	// Creating the local state to keep track of the authentication
	const [tokenManager] = useState<TokenManager>(
		JSON.parse(localStorage.getItem("TokenManager")!)
	)
	return (
		<AuthContext.Provider
			value={{
				tokenManager,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
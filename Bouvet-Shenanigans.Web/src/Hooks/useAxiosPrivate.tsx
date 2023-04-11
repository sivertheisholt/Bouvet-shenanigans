import { useContext, useEffect } from "react"
import { axiosPrivate } from "../Api/CustomAxios"
import { AuthContext } from "../Context/AuthContextProvider"
import { interceptToken } from "../Interceptors/axiosInterceptor"


export const useAxiosPrivate = () => {
	var authContext = useContext(AuthContext)
	var tokenManager = authContext.tokenManager
	useEffect(() => {
		if (tokenManager != null) interceptToken(tokenManager, axiosPrivate)
	}, [tokenManager])
	return axiosPrivate
}
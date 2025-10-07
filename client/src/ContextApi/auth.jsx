import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [token , setToken] = useState(localStorage.getItem('token'))
    const [user , setUser] = useState("")
    const storeTokenInLs = (serverToken)=>{
         localStorage.setItem("token", serverToken)
         setToken(serverToken)
    }
// console.log("user data",user);
    const isLoggedIn = !!token
    // console.log(isLoggedIn);
    // logout functionality

    const logoutUser = ()=>{
        setToken("")
        return localStorage.removeItem('token')
    }

    // jwt authentication to get currently loggedIn user

    const userAuthentication = async () => {
         if (!token) return; 
        try {
            const response = await axios.get('http://localhost:8000/api/auth/user',{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                // console.log("User Data:", response.data.userData);
                // console.log("response" , response);
                setUser(response.data.userData); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        userAuthentication()
    },[])

    return <AuthContext.Provider value={{storeTokenInLs , logoutUser , isLoggedIn , user}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    const authContectValue =  useContext(AuthContext)
    if (!authContectValue) {
        throw new Error("use Auth Outside of the Provider")
    }
    return authContectValue
}
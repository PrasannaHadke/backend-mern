import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../ContextApi/auth'
function Logout() {
    const navigate = useNavigate()
    const {logoutUser} = useAuth()
    useEffect(()=>{
        logoutUser()
    },[logoutUser])
  return (
    <Navigate to="/login" />
  )
}

export default Logout
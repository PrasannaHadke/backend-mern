import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [userSignIn , setUserSignIn] = useState({
    email : "",
    password : ""
  })

  const handleInput = (e)=>{
    let {name , value} = e.target
    setUserSignIn({
      ...userSignIn,
      [name] : value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login",userSignIn,{
        headers : {"Content-Type" : "application/json"}
      })
      if (response.ok) {
        let res_data = response.data.token
      // store token in local storage
      // storeTokenInLs(response.data.token)
      localStorage.setItem("token",res_data)
        setUserSignIn({email : "" , password: ""})
        navigate('/')
      }
      console.log("Login response",response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg || "Error sign in user")
      }else{
        alert("Server error, try again later")
      }
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            name="email"
            id="email"
            placeholder='Enter Your Email'
            onChange={handleInput}
            value={userSignIn.email} 
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            placeholder='Enter Your password'
            onChange={handleInput}
            value={userSignIn.password} 
            required
          />
        </div>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default Login

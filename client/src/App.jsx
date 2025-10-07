import React from 'react'
import {RouterProvider , createRoutesFromElements ,createBrowserRouter, Route} from 'react-router-dom'
import Layout from "../src/Layout/Layout"
import Home from "../src/Components/Home/Home"
import About from "../src/Components/About/About"
import Contact from "../src/Components/Contact/Contact"
import Services from "../src/Components/Services/Services"
import Login from "../src/Components/Login/Login"
import Signup from "../src/Components/Signup/Signup.jsx"
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx'
import Logout from './Components/Logout/Logout.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element= {<Layout/>}>
      <Route index element= {<Home/>}/>
      <Route path='about' element= {<About/>}/>
      <Route path='contact' element= {<Contact/>}/>
      <Route path='services' element= {<Services/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='logout' element={<Logout/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path ="*" element = {<ErrorPage/>}/>
    </Route>
  )
)
function App() {
  return (
    <RouterProvider router = {router}/>
  )
}

export default App
import React from 'react'
import "../Header/Header.css"
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about">
        About
      </NavLink>
      <NavLink to="/contact">
        Contact
      </NavLink>
      <NavLink to="/services">
        Services
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/signup">
        SignUp
      </NavLink>
    </header>
  )
}

export default Header

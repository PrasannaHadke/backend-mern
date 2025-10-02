import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../Components/Header/Header'
import "../Layout/Layout.css"
import Footer from '../Components/Footer/Footer'

function Layout() {
  return (
    <div className="layout-container">
      <div className="layout-header">
        <Header/>
      </div>
      <main className="layout-content">
        <Outlet/>
      </main>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout

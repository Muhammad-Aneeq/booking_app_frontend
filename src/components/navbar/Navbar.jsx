import React from 'react'
import "./Navbar.css"
import {useAuthContext} from "../../context/AuthContext"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {user} = useAuthContext()
  return (
    <div  className="navbar">
    <div className="navContainer">
    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">bookingItNow</span>
        </Link>
        {user? user.username : (
          <div className="navItems">
        <button className="navButton">Register</button>
        <button className="navButton">Login</button>
      </div>
        )}
   
    </div>
  </div>
  )
}

export default Navbar
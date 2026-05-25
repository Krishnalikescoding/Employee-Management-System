import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider.jsx";
import "../../css/Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="header main">
      <h2>Hello <span>{user?.firstName || 'User'} 👋</span></h2>
      <div className="logout-btn">
        <button type="button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default Header

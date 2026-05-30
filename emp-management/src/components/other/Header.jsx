import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider.jsx'
import { APP_NAME, COMPANY_NAME } from '../../constants/branding.js'
import '../../css/Header.css'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?')
    if (!confirmed) return
    logout()
    navigate('/')
  }

  return (
    <header className="header main">
      <div className="header-left">
        <div className="header-brand">
          <span className="header-brand-mark">{COMPANY_NAME.charAt(0)}</span>
          <div>
            <p className="header-company">{COMPANY_NAME}</p>
            <p className="header-app">{APP_NAME}</p>
          </div>
        </div>
        <h2 className="header-greeting">
          Hello <span>{user?.firstName || 'User'}</span>
        </h2>
      </div>
      <div className="logout-btn">
        <button type="button" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </header>
  )
}

export default Header

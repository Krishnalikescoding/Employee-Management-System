import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'
import { APP_NAME, APP_TAGLINE, COMPANY_NAME } from '../../constants/branding.js'
import '../../css/Login.css'

const Login = ({ handleLogin, loading }) => {
  const { getStaySignedInDefault } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [staySignedIn, setStaySignedIn] = useState(() => getStaySignedInDefault())

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(email, password, staySignedIn)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">{COMPANY_NAME.charAt(0)}</span>
          <div>
            <p className="login-company">{COMPANY_NAME}</p>
            <h2>{APP_NAME}</h2>
          </div>
        </div>
        <p className="login-tagline">{APP_TAGLINE}</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@manthaninfotech.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <label className="stay-signed-in">
            <input
              type="checkbox"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
            />
            <span>Stay signed in</span>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

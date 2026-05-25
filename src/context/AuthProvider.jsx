import React, { createContext, useCallback, useEffect, useState } from 'react'
import { getMeRequest, loginRequest } from '../api/api.js'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const persistSession = (token, userData) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('loggedInUser', JSON.stringify(userData))
    setUser(userData)
  }

  const clearSession = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('loggedInUser')

    if (!token || !storedUser) {
      setAuthChecked(true)
      return
    }

    try {
      const { user: freshUser } = await getMeRequest()
      setUser(freshUser)
    } catch {
      clearSession()
    } finally {
      setAuthChecked(true)
    }
  }, [])

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { token, user: loggedInUser } = await loginRequest(email, password)
      persistSession(token, loggedInUser)
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearSession()
  }

  return (
    <AuthContext.Provider value={{ user, authChecked, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

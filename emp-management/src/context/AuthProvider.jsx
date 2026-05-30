import React, { createContext, useCallback, useEffect, useState } from 'react'
import { getMeRequest, loginRequest } from '../api/api.js'

export const AuthContext = createContext(null)

const STAY_SIGNED_IN_KEY = 'staySignedIn'

const readAuthFromStorage = () => {
  const localToken = localStorage.getItem('authToken')
  const localUser = localStorage.getItem('loggedInUser')
  if (localToken && localUser) {
    return { storage: localStorage, token: localToken, storedUser: localUser }
  }

  const sessionToken = sessionStorage.getItem('authToken')
  const sessionUser = sessionStorage.getItem('loggedInUser')
  if (sessionToken && sessionUser) {
    return { storage: sessionStorage, token: sessionToken, storedUser: sessionUser }
  }

  return null
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const persistSession = (token, userData, staySignedIn) => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('loggedInUser')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('loggedInUser')

    const storage = staySignedIn ? localStorage : sessionStorage
    storage.setItem('authToken', token)
    storage.setItem('loggedInUser', JSON.stringify(userData))
    localStorage.setItem(STAY_SIGNED_IN_KEY, staySignedIn ? '1' : '0')
    setUser(userData)
  }

  const clearSession = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('loggedInUser')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const restoreSession = useCallback(async () => {
    const session = readAuthFromStorage()

    if (!session) {
      setAuthChecked(true)
      return
    }

    try {
      const { user: freshUser } = await getMeRequest()
      setUser(freshUser)
      session.storage.setItem('loggedInUser', JSON.stringify(freshUser))
    } catch {
      clearSession()
    } finally {
      setAuthChecked(true)
    }
  }, [])

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  const login = async (email, password, staySignedIn = true) => {
    setLoading(true)
    try {
      const { token, user: loggedInUser } = await loginRequest(email, password)
      persistSession(token, loggedInUser, staySignedIn)
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearSession()
  }

  const getStaySignedInDefault = () => localStorage.getItem(STAY_SIGNED_IN_KEY) !== '0'

  return (
    <AuthContext.Provider
      value={{ user, authChecked, loading, login, logout, setUser, getStaySignedInDefault }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

import React, { useContext } from 'react'
import Login from './components/Auth/Login.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

const App = () => {
  const { user, authChecked, login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await login(email, password)

      if (loggedInUser.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/employee')
      }
    } catch (error) {
      alert(error.message || 'Invalid credentials')
    }
  }

  if (!authChecked) {
    return <div style={{ minHeight: '100vh', background: '#111' }} />
  }

  return (
    <Routes>
      <Route path='/' element={<Login handleLogin={handleLogin} />} />
      <Route
        path='/admin'
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path='/employee'
        element={user?.role === 'employee' ? <EmployeeDashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default App

import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import { getLocalStorage } from './utils/localStorage.jsx'
import { AuthContext } from './context/AuthProvider.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const authData = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getLocalStorage()
  }, [])

  useEffect(() => {
    if (authData) {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
      if (loggedInUser) {
        setUser(loggedInUser.role)
      }
    }
  }, [authData])

  const handleLogin = (email, password) => {
    if (authData && authData.admin.find((e) => email == e.email && e.password == password)) {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      navigate('/admin')  // ← added
    } else if (authData && authData.employees.find((e) => email == e.email && e.password == password)) {
      const employeeData = authData.employees.find((e) => email == e.email && e.password == password)
      setUser('employee')
      setLoggedInUser(employeeData)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee' }))
      navigate('/employee')  // ← added
    } else {
      alert("Invalid Credentials")
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Login handleLogin={handleLogin} />} />
      <Route path='/admin' element={user === 'admin' && <AdminDashboard />} />
      <Route path='/employee' element={user === 'employee' && <EmployeeDashboard data={loggedInUser} />} />
    </Routes>
  )
}

export default App
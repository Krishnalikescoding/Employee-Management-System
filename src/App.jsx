import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  // useEffect(() => {
  //   setLocalStorage()
  //   getLocalStorage()
  // }, [])

  const [user, setUser] = useState(null)
  const authData = useContext(AuthContext)

  // const handleLogin = (email, password) => {
  //   if (){

  //   }else if(authData && authData.employees.find((e)=> )){
  //     setUser('employee')
  //   }else{
  //     alert("Invalid Credentials")
  //   }
  // }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <EmployeeDashboard /> : <AdminDashboard />}
    </>
  )
}

export default App
import React, { useEffect, useState } from "react";
import { getMyTasksRequest } from "../../api/api.js";
import TaskNumber from "../other/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getMyTasksRequest()
        setTasks(data.tasks)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  if (loading) {
    return <div style={{ minHeight: '100vh', background: '#111' }} />
  }

  return (
    <div>
      <Header />
      {error && <p style={{ color: '#f87171', padding: '1rem' }}>{error}</p>}
      <TaskNumber tasks={tasks} />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default EmployeeDashboard

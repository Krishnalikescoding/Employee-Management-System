import React, { useEffect, useState } from "react";
import { getAllTasksRequest } from "../../api/api.js";
import "../../css/AdminDashBoardTaskList.css"

const statusLabel = {
  new: 'New',
  accepted: 'Accepted',
  completed: 'Completed',
  failed: 'Failed',
}

const AdminDashBoardTaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getAllTasksRequest()
        setTasks(data.tasks)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  return (
    <div className="main-container">
      <h2>Tasks Assigned By You</h2>
      <div className="taskList-container">
        <div className="taskList-header">
          <span>Assigned To</span>
          <span>Task</span>
          <span>Status</span>
        </div>

        {loading && <p style={{ color: '#aaa', padding: '1rem' }}>Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p style={{ color: '#aaa', padding: '1rem' }}>No tasks in database yet.</p>
        )}

        {tasks.map((task) => (
          <div className="taskList" key={task.id}>
            <div className="assignedTo">{task.employeeName}</div>
            <div className="assignedTask">{task.title}</div>
            <div className={`status ${task.status}`}>{statusLabel[task.status]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashBoardTaskList

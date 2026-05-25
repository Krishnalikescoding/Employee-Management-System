import React from 'react'
import "../../css/TaskList.css";

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const TaskList = ({ tasks = [] }) => {
  if (tasks.length === 0) {
    return <p style={{ color: '#aaa', padding: '1rem' }}>No tasks assigned yet.</p>
  }

  return (
    <div className="Card-Container">
      {tasks.map((task) => (
        <div className="Cards" key={task.id}>
          <div className="header">
            <div className="urgency">
              <h2>{task.category}</h2>
            </div>
            <div className="assigned-date">
              <h2>{formatDate(task.dueDate)}</h2>
            </div>
          </div>
          <div className="task-body">
            <div className="task-title">
              <h2>{task.title}</h2>
            </div>
            <div className="task-description">
              <h2>{task.description}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList

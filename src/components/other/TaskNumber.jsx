import React from 'react'
import "../../css/TaskNumber.css";

const TaskNumber = ({ tasks = [] }) => {
  const counts = tasks.reduce(
    (acc, task) => {
      if (task.status === 'new') acc.new += 1
      if (task.status === 'accepted') acc.accepted += 1
      if (task.status === 'completed') acc.completed += 1
      if (task.status === 'failed') acc.failed += 1
      return acc
    },
    { new: 0, accepted: 0, completed: 0, failed: 0 }
  )

  return (
    <div className="Tasks">
      <div className="New-Task">{counts.new}</div>
      <div className="Completed-Task">{counts.completed}</div>
      <div className="Accepted-Task">{counts.accepted}</div>
      <div className="Failed-Task">{counts.failed}</div>
    </div>
  )
}

export default TaskNumber

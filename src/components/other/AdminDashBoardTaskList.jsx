import React, { useEffect, useState } from "react";
import { getAllTasksRequest } from "../../api/api.js";
import { PRIORITY_CLASS, STATUS_CLASS, STATUS_LABELS } from "../../constants/taskOptions.js";
import "../../css/AdminDashBoardTaskList.css";

const AdminDashBoardTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await getAllTasksRequest();
        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  return (
    <div className="main-container admin-task-list">
      <h2>Tasks Assigned By You</h2>
      <div className="taskList-container">
        <div className="taskList-header">
          <span>ID</span>
          <span>Assigned To</span>
          <span>Task</span>
          <span>Priority</span>
          <span>Status</span>
        </div>

        {loading && <p className="list-msg">Loading tasks...</p>}
        {!loading && tasks.length === 0 && (
          <p className="list-msg">No tasks yet. Create one above.</p>
        )}

        {tasks.map((task) => (
          <div className="taskList" key={task.id}>
            <div className="task-id">{task.taskCode}</div>
            <div className="assignedTo">{task.employeeName}</div>
            <div className="assignedTask">
              <strong>{task.title}</strong>
              <small>{task.displayTag}</small>
            </div>
            <div className={`badge ${PRIORITY_CLASS[task.priority]}`}>
              {task.priority}
            </div>
            <div className={`badge ${STATUS_CLASS[task.status]}`}>
              {STATUS_LABELS[task.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoardTaskList;

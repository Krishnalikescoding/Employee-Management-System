import React, { useEffect, useMemo, useState } from "react";
import { getAllTasksRequest } from "../../api/api.js";
import {
  PRIORITIES,
  STATUSES,
  PRIORITY_CLASS,
  STATUS_CLASS,
  STATUS_LABELS,
} from "../../constants/taskOptions.js";
import "../../css/AdminDashBoardTaskList.css";

const AdminDashBoardTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const priorityOk = priorityFilter === "all" || task.priority === priorityFilter;
      const statusOk = statusFilter === "all" || task.status === statusFilter;
      return priorityOk && statusOk;
    });
  }, [tasks, priorityFilter, statusFilter]);

  return (
    <div className="main-container admin-task-list">
      <h2>Tasks Assigned By You</h2>
      <div className="task-filters">
        <div className="task-filter">
          <label htmlFor="admin-filter-priority">Priority</label>
          <select
            id="admin-filter-priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All</option>
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="task-filter">
          <label htmlFor="admin-filter-status">Status</label>
          <select
            id="admin-filter-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
            <option value="failed">Failed</option>
          </select>
        </div>

        <button
          type="button"
          className="task-filter-clear"
          onClick={() => {
            setPriorityFilter("all");
            setStatusFilter("all");
          }}
          disabled={priorityFilter === "all" && statusFilter === "all"}
        >
          Clear
        </button>

        <div className="task-filter-count">
          Showing <strong>{filteredTasks.length}</strong> / {tasks.length}
        </div>
      </div>
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
        {!loading && tasks.length > 0 && filteredTasks.length === 0 && (
          <p className="list-msg">No tasks match the selected filters.</p>
        )}

        {filteredTasks.map((task) => (
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

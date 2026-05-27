import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getMyTasksRequest } from "../../api/api.js";
import TaskNumber from "../other/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";
import NotificationBanner from "../other/NotificationBanner";
import { PRIORITIES, STATUSES } from "../../constants/taskOptions.js";
import "../../css/TaskList.css";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyTasksRequest();
      setTasks(data.tasks);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const priorityOk = priorityFilter === "all" || task.priority === priorityFilter;
      const statusOk = statusFilter === "all" || task.status === statusFilter;
      return priorityOk && statusOk;
    });
  }, [tasks, priorityFilter, statusFilter]);

  if (loading) {
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return (
    <div>
      <Header />
      <NotificationBanner />
      {error && <p className="list-msg error-msg">{error}</p>}
      <div className="task-filters task-filters--employee">
        <div className="task-filter">
          <label htmlFor="employee-filter-priority">Priority</label>
          <select
            id="employee-filter-priority"
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
          <label htmlFor="employee-filter-status">Status</label>
          <select
            id="employee-filter-status"
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

      <TaskNumber tasks={filteredTasks} />
      <TaskList tasks={filteredTasks} onTaskUpdated={loadTasks} />
    </div>
  );
};

export default EmployeeDashboard;

import React, { useCallback, useEffect, useState } from "react";
import { getMyTasksRequest } from "../../api/api.js";
import { useTaskFilters } from "../../hooks/useTaskFilters.js";
import TaskNumber from "../other/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";
import NotificationBanner from "../other/NotificationBanner";
import TaskFilters from "../shared/TaskFilters.jsx";
import DashboardSkeleton from "../shared/DashboardSkeleton.jsx";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    priorityFilter,
    statusFilter,
    setPriorityFilter,
    setStatusFilter,
    filteredTasks,
    clearFilters,
    hasActiveFilters,
  } = useTaskFilters(tasks);

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

  if (loading) {
    return (
      <>
        <Header />
        <DashboardSkeleton variant="employee" />
      </>
    );
  }

  return (
    <div className="dashboard-page">
      <Header />
      <NotificationBanner />

      <div className="dashboard-content">
        {error && <p className="list-msg error-msg">{error}</p>}

        <section className="dashboard-section">
          <div className="dashboard-section__header">
            <div>
              <h2 className="dashboard-section__title">My tasks</h2>
              <p className="dashboard-section__subtitle">
                Track and update your assigned work
              </p>
            </div>
          </div>

          <TaskFilters
            priorityFilter={priorityFilter}
            statusFilter={statusFilter}
            onPriorityChange={setPriorityFilter}
            onStatusChange={setStatusFilter}
            onClear={clearFilters}
            filteredCount={filteredTasks.length}
            totalCount={tasks.length}
          />
        </section>

        <TaskNumber tasks={filteredTasks} />

        <TaskList
          tasks={filteredTasks}
          onTaskUpdated={loadTasks}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;

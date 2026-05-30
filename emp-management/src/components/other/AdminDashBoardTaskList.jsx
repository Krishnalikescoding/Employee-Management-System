import React, { useEffect, useState } from "react";
import { getAllTasksRequest } from "../../api/api.js";
import { useTaskFilters } from "../../hooks/useTaskFilters.js";
import {
  PRIORITY_CLASS,
  STATUS_CLASS,
  STATUS_LABELS,
} from "../../constants/taskOptions.js";
import TaskFilters from "../shared/TaskFilters.jsx";
import EmptyState from "../shared/EmptyState.jsx";
import DashboardSkeleton from "../shared/DashboardSkeleton.jsx";
import "../../css/AdminDashBoardTaskList.css";

const AdminDashBoardTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    priorityFilter,
    statusFilter,
    setPriorityFilter,
    setStatusFilter,
    filteredTasks,
    clearFilters,
  } = useTaskFilters(tasks);

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

  if (loading) {
    return (
      <div className="dashboard-content">
        <DashboardSkeleton variant="admin" />
      </div>
    );
  }

  return (
    <section className="dashboard-content dashboard-section admin-task-list">
      <div className="dashboard-section__header">
        <div>
          <h2 className="dashboard-section__title">Tasks assigned by you</h2>
          <p className="dashboard-section__subtitle">
            Overview of all tasks you have created
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

      {tasks.length === 0 ? (
        <EmptyState
          icon="✨"
          title="No tasks yet"
          message="Create your first task using the form above to assign work to your team."
        />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching tasks"
          message="Try adjusting your filters to see more results."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="taskList-container">
          <div className="taskList-header">
            <span>ID</span>
            <span>Assigned To</span>
            <span>Task</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

          {filteredTasks.map((task, index) => (
            <div
              className={`taskList ${index % 2 === 1 ? "taskList--alt" : ""}`}
              key={task.id}
            >
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
      )}
    </section>
  );
};

export default AdminDashBoardTaskList;

import React from "react";
import "../../css/TaskNumber.css";

const STAT_CARDS = [
  { key: "todo", label: "Todo", className: "stat-todo" },
  { key: "inProgress", label: "In Progress", className: "stat-in_progress" },
  { key: "review", label: "Review", className: "stat-review" },
  { key: "completed", label: "Completed", className: "stat-completed" },
  { key: "failed", label: "Failed", className: "stat-failed" },
];

const TaskNumber = ({ tasks = [] }) => {
  const counts = tasks.reduce(
    (acc, task) => {
      if (task.status === "todo") acc.todo += 1;
      if (task.status === "in_progress") acc.inProgress += 1;
      if (task.status === "review") acc.review += 1;
      if (task.status === "completed") acc.completed += 1;
      if (task.status === "failed") acc.failed += 1;
      return acc;
    },
    { todo: 0, inProgress: 0, review: 0, completed: 0, failed: 0 }
  );

  return (
    <div className="stats-grid" role="group" aria-label="Task summary by status">
      {STAT_CARDS.map(({ key, label, className }) => (
        <div key={key} className={`stat-card ${className}`}>
          <span className="stat-card__value">{counts[key]}</span>
          <span className="stat-card__label">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskNumber;

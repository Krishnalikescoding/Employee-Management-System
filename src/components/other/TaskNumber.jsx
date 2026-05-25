import React from "react";
import "../../css/TaskNumber.css";

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
    <div className="Tasks">
      <div className="Todo-Task">{counts.todo}</div>
      <div className="InProgress-Task">{counts.inProgress}</div>
      <div className="Review-Task">{counts.review}</div>
      <div className="Completed-Task">{counts.completed}</div>
      <div className="Failed-Task">{counts.failed}</div>
    </div>
  );
};

export default TaskNumber;

import React, { useState } from "react";
import Header from "../other/Header";
import CreateTaskForm from "../other/CreateTaskForm";
import AdminDashBoardTaskList from "../other/AdminDashBoardTaskList";

const AdminDashboard = () => {
  const [taskListKey, setTaskListKey] = useState(0)

  const handleTaskCreated = () => {
    setTaskListKey((prev) => prev + 1)
  }

  return (
    <>
      <Header />
      <CreateTaskForm onTaskCreated={handleTaskCreated} />
      <AdminDashBoardTaskList key={taskListKey} />
    </>
  )
}

export default AdminDashboard

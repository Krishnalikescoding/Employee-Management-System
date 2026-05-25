import React, { useCallback, useEffect, useState } from "react";
import { getMyTasksRequest } from "../../api/api.js";
import TaskNumber from "../other/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";
import NotificationBanner from "../other/NotificationBanner";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return (
    <div>
      <Header />
      <NotificationBanner />
      {error && <p className="list-msg error-msg">{error}</p>}
      <TaskNumber tasks={tasks} />
      <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
    </div>
  );
};

export default EmployeeDashboard;

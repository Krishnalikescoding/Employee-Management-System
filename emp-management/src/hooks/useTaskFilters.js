import { useMemo, useState } from "react";

export const useTaskFilters = (tasks = []) => {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const priorityOk = priorityFilter === "all" || task.priority === priorityFilter;
      const statusOk = statusFilter === "all" || task.status === statusFilter;
      return priorityOk && statusOk;
    });
  }, [tasks, priorityFilter, statusFilter]);

  const clearFilters = () => {
    setPriorityFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters = priorityFilter !== "all" || statusFilter !== "all";

  return {
    priorityFilter,
    statusFilter,
    setPriorityFilter,
    setStatusFilter,
    filteredTasks,
    clearFilters,
    hasActiveFilters,
  };
};

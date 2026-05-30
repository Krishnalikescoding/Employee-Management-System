import React from "react";
import { PRIORITIES, STATUSES } from "../../constants/taskOptions.js";
import "../../css/TaskFilters.css";

const FILTER_STATUSES = [...STATUSES, { value: "failed", label: "Failed" }];

const TaskFilters = ({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  onClear,
  filteredCount,
  totalCount,
}) => {
  const hasActiveFilters = priorityFilter !== "all" || statusFilter !== "all";

  return (
    <div className="filter-toolbar" role="search" aria-label="Filter tasks">
      <div className="filter-toolbar__top">
        <span className="filter-toolbar__label">Filters</span>
        <span className="filter-toolbar__count">
          Showing <strong>{filteredCount}</strong> of {totalCount}
        </span>
        <button
          type="button"
          className="filter-toolbar__clear"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          Clear all
        </button>
      </div>

      <div className="filter-group">
        <span className="filter-group__title">Priority</span>
        <div className="filter-chips" role="group" aria-label="Filter by priority">
          <button
            type="button"
            className={`filter-chip ${priorityFilter === "all" ? "filter-chip--active" : ""}`}
            onClick={() => onPriorityChange("all")}
            aria-pressed={priorityFilter === "all"}
          >
            All
          </button>
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              className={`filter-chip filter-chip--priority-${p.value} ${
                priorityFilter === p.value ? "filter-chip--active" : ""
              }`}
              onClick={() => onPriorityChange(p.value)}
              aria-pressed={priorityFilter === p.value}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group__title">Status</span>
        <div className="filter-chips" role="group" aria-label="Filter by status">
          <button
            type="button"
            className={`filter-chip ${statusFilter === "all" ? "filter-chip--active" : ""}`}
            onClick={() => onStatusChange("all")}
            aria-pressed={statusFilter === "all"}
          >
            All
          </button>
          {FILTER_STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`filter-chip filter-chip--status-${s.value} ${
                statusFilter === s.value ? "filter-chip--active" : ""
              }`}
              onClick={() => onStatusChange(s.value)}
              aria-pressed={statusFilter === s.value}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;

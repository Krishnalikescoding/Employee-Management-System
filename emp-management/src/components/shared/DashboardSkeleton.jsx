import React from "react";

const DashboardSkeleton = ({ variant = "employee" }) => (
  <div className="dashboard-page" aria-busy="true" aria-label="Loading dashboard">
    <div className="skeleton skeleton-header" style={{ margin: "1rem 2rem" }} />
    {variant === "employee" && (
      <div className="skeleton-stats">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton-stat" />
        ))}
      </div>
    )}
    <div style={{ padding: "0 2rem" }}>
      <div className="skeleton" style={{ height: 120, marginBottom: "1rem" }} />
      {variant === "employee" ? (
        <>
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </>
      ) : (
        <>
          <div className="skeleton skeleton-table-row" />
          <div className="skeleton skeleton-table-row" />
          <div className="skeleton skeleton-table-row" />
        </>
      )}
    </div>
  </div>
);

export default DashboardSkeleton;

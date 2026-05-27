import React from "react";

const EmptyState = ({
  icon = "📋",
  title = "Nothing here yet",
  message,
  actionLabel,
  onAction,
}) => (
  <div className="empty-state">
    <div className="empty-state__icon" aria-hidden="true">
      {icon}
    </div>
    <h3 className="empty-state__title">{title}</h3>
    {message && <p className="empty-state__text">{message}</p>}
    {actionLabel && onAction && (
      <button type="button" className="empty-state__btn" onClick={onAction}>
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;

import React, { useEffect, useState } from "react";
import {
  getNotificationsRequest,
  markNotificationsReadRequest,
} from "../../api/api.js";
import "../../css/NotificationBanner.css";

const NotificationBanner = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = async () => {
    try {
      const data = await getNotificationsRequest();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  const markRead = async () => {
    await markNotificationsReadRequest();
    load();
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-banner">
      <div className="notification-header">
        <h3>Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
        <button type="button" onClick={markRead}>Mark all read</button>
      </div>
      <ul>
        {notifications.slice(0, 5).map((n) => (
          <li key={n.id} className={n.isRead ? "read" : "unread"}>
            <strong>{n.taskCode}</strong> — {n.message}
          </li>
        ))}
      </ul>
      <p className="notification-note">Dashboard alerts shown here. Email can be added later via SMTP.</p>
    </div>
  );
};

export default NotificationBanner;

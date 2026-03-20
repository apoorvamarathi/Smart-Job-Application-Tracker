// src/components/Notifications/NotificationsPage.jsx
import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import './Notifications.css';

const NotificationsPage = () => {
  const { notifications, markAsRead } = useNotifications();

  // Optional: group by date
  const groupByDate = (notifications) => {
    const groups = {};
    notifications.forEach((notif) => {
      const date = new Date(notif.createdAt).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(notif);
    });
    return groups;
  };

  const grouped = groupByDate(notifications);

  return (
    <div className="notifications-page">
      <h2>All Notifications</h2>

      {notifications.length === 0 ? (
        <p className="empty">No notifications</p>
      ) : (
        <div className="notifications-list">
          {Object.keys(grouped).map((date) => (
            <div key={date} className="date-group">
              <h3 className="date-header">{date}</h3>
              <ul>
                {grouped[date].map((notif) => (
                  <li key={notif._id} className={notif.read ? 'read' : 'unread'}>
                    <div className="notification-item">
                      <div className="notification-content">
                        <p className="message">{notif.message}</p>
                        <small>{new Date(notif.createdAt).toLocaleTimeString()}</small>
                      </div>
                      {!notif.read && (
                        <button
                          className="mark-read-btn"
                          onClick={() => markAsRead(notif._id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
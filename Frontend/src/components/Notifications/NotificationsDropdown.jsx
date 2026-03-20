// src/components/Notifications/NotificationsDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import './Notifications.css';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    markAsRead(id);
  };

  // Show only first 5 notifications
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="notifications-dropdown" ref={dropdownRef}>
      <button className="bell-icon" onClick={toggleDropdown}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <h4>Notifications</h4>
            <Link to="/notifications" onClick={() => setIsOpen(false)}>
              View All
            </Link>
          </div>

          {notifications.length === 0 ? (
            <p className="empty">No notifications</p>
          ) : (
            <ul className="notification-list">
              {recentNotifications.map((notif) => (
                <li key={notif._id} className={notif.read ? 'read' : 'unread'}>
                  <div className="notification-item">
                    <p className="message">{notif.message}</p>
                    <small>{new Date(notif.createdAt).toLocaleString()}</small>
                    {!notif.read && (
                      <button
                        className="mark-read"
                        onClick={(e) => handleMarkAsRead(notif._id, e)}
                      >
                        ✓
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {notifications.length > 5 && (
            <div className="dropdown-footer">
              <Link to="/notifications" onClick={() => setIsOpen(false)}>
                See all {notifications.length} notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
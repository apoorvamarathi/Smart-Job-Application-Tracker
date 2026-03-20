// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">JobPortal</Link>
        <ul className="nav-menu">
          <li><Link to="/jobs">Jobs</Link></li>
          {user ? (
            <>
              {user.role === 'jobseeker' && (
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/my-applications">My Applications</Link></li>
                </>
              )}
              {user.role === 'recruiter' && (
                <>
                  <li><Link to="/company-profile">Company Profile</Link></li>
                  <li><Link to="/my-jobs">My Jobs</Link></li>
                  <li><Link to="/post-job">Post Job</Link></li>
                </>
              )}
              {user.role === 'admin' && (
                <li><Link to="/admin">Admin Dashboard</Link></li>
              )}
              <li>
                <Link to="/notifications" className="notification-bell">
                  🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                </Link>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
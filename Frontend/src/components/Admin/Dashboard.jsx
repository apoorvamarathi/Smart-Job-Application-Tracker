// src/components/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats'); // need backend endpoint
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>Total Users: {stats.users}</div>
        <div>Total Jobs: {stats.jobs}</div>
        <div>Total Applications: {stats.applications}</div>
      </div>
      <div className="admin-links">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/approvals">Recruiter Approvals</Link>
        <Link to="/admin/reports">Reports</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;


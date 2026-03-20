// src/components/Admin/Reports.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './Admin.css'; // we'll add styles

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await api.get('/admin/reports');
      setStats(data);
    } catch (err) {
      setError('Failed to load reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return null;

  // Helper to render a simple horizontal bar chart
  const renderBar = (label, value, max, color = '#007bff') => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="stat-bar-item">
        <span className="stat-label">{label}: {value}</span>
        <div className="bar-container">
          <div className="bar" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
        </div>
      </div>
    );
  };

  // Find max value for scaling bars
  const maxStatusValue = Math.max(
    stats.applicationsByStatus.pending,
    stats.applicationsByStatus.reviewed,
    stats.applicationsByStatus.accepted,
    stats.applicationsByStatus.rejected
  );

  const maxRoleValue = Math.max(
    stats.usersByRole.jobSeekers,
    stats.usersByRole.recruiters,
    stats.usersByRole.admins
  );

  return (
    <div className="reports-page">
      <h1>Platform Reports</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p className="card-value">{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Jobs</h3>
          <p className="card-value">{stats.totalJobs}</p>
        </div>
        <div className="card">
          <h3>Total Applications</h3>
          <p className="card-value">{stats.totalApplications}</p>
        </div>
      </div>

      {/* Users by Role */}
      <div className="chart-section">
        <h2>Users by Role</h2>
        <div className="bar-chart">
          {renderBar('Job Seekers', stats.usersByRole.jobSeekers, maxRoleValue, '#28a745')}
          {renderBar('Recruiters', stats.usersByRole.recruiters, maxRoleValue, '#ffc107')}
          {renderBar('Admins', stats.usersByRole.admins, maxRoleValue, '#dc3545')}
        </div>
      </div>

      {/* Applications by Status */}
      <div className="chart-section">
        <h2>Applications by Status</h2>
        <div className="bar-chart">
          {renderBar('Pending', stats.applicationsByStatus.pending, maxStatusValue, '#6c757d')}
          {renderBar('Reviewed', stats.applicationsByStatus.reviewed, maxStatusValue, '#17a2b8')}
          {renderBar('Accepted', stats.applicationsByStatus.accepted, maxStatusValue, '#28a745')}
          {renderBar('Rejected', stats.applicationsByStatus.rejected, maxStatusValue, '#dc3545')}
        </div>
      </div>

      {/* Additional reports can be added later */}
    </div>
  );
};

export default Reports;
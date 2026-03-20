// src/components/JobSeeker/MyApplications.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/applications/me');
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-applications">
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.jobId?.title}</td>
                <td>{app.jobId?.company}</td>
                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                <td>{app.status}</td>
                <td>{app.feedback || 'No feedback'}</td>
                <td><Link to={`/applications/${app._id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyApplications;
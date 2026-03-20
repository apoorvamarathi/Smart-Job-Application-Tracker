// src/components/Recruiter/ViewApplication.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const ViewApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const { data } = await api.get(`/applications/${id}`); // need backend endpoint
      setApplication(data);
      setStatus(data.status);
      setFeedback(data.feedback || '');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/applications/${id}`, { status, feedback });
      setMessage('Application updated');
      setTimeout(() => navigate(`/jobs/${application.jobId._id}/applications`), 1500);
    } catch (err) {
      setMessage('Update failed');
    }
  };

  if (!application) return <div>Loading...</div>;

  return (
    <div className="view-application">
      <h2>Manage Application</h2>
      <p><strong>Applicant:</strong> {application.userId?.name}</p>
      <p><strong>Email:</strong> {application.userId?.email}</p>
      <p><strong>Job:</strong> {application.jobId?.title}</p>
      <p><strong>Applied:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
      <p><strong>Resume:</strong> <a href={application.resume} target="_blank">Download</a></p>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleUpdate}>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <label>Feedback (optional):</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Provide feedback to the applicant, especially if rejected"
        />

        <button type="submit">Update Application</button>
      </form>
    </div>
  );
};

export default ViewApplication;
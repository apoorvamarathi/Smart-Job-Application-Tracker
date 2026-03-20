// src/components/Recruiter/JobApplications.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobAndApplications();
  }, [jobId]);

  const fetchJobAndApplications = async () => {
    try {
      const jobRes = await api.get(`/jobs/${jobId}`);
      setJob(jobRes.data);
      const appRes = await api.get(`/applications/job/${jobId}`);
      setApplications(appRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="job-applications">
      <h2>Applications for {job?.title}</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.userId?.name}</td>
                <td>{app.userId?.email}</td>
                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                <td>{app.status}</td>
                <td><a href={app.resume} target="_blank">Download</a></td>
                <td><Link to={`/applications/${app._id}/manage`}>Manage</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobApplications;
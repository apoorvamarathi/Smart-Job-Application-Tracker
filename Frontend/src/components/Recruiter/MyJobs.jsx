// src/components/Recruiter/MyJobs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs/my'); // need backend endpoint for recruiter's jobs
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-jobs">
      <h2>My Job Postings</h2>
      <Link to="/post-job" className="btn">Post New Job</Link>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Posted</th>
              <th>Applications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>{job.applicationCount || 0}</td>
                <td>
                  <Link to={`/jobs/${job._id}/applications`}>View Applications</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyJobs;
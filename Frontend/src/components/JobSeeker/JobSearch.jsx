
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ title: '', location: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      console.log(data);
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

const filteredJobs = (jobs || []).filter(job =>
  (job.title || '').toLowerCase().includes(filters.title.toLowerCase()) &&
  (job.location || '').toLowerCase().includes(filters.location.toLowerCase())
);

  return (
    <div className="job-search">
      <h2>Find Jobs</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Job title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>
      <div className="job-list">
        {filteredJobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>{job.description.substring(0, 100)}...</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
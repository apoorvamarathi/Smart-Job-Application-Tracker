// src/components/JobSeeker/ApplyJob.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile/me');
      setProfile(data);
      setResume(data.resume || '');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setMessage('Please upload a resume in your profile first');
      return;
    }
    try {
      await api.post('/applications', { jobId, resume });
      setMessage('Application submitted successfully!');
      setTimeout(() => navigate('/my-applications'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error applying');
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="apply-job">
      <h2>Apply for Job</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <p>Using resume: {resume ? <a href={resume} target="_blank">View</a> : 'None'}</p>
        <p>You can update your resume in <Link to="/profile">Profile</Link></p>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
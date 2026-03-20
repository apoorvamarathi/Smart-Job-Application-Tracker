// src/components/JobSeeker/ApplicationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const { data } = await api.get(`/applications/${id}`); // need to add this endpoint
      setApplication(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!application) return <div>Loading...</div>;

  return (
    <div className="application-details">
      <h2>Application Details</h2>
      <p><strong>Job:</strong> {application.jobId?.title}</p>
      <p><strong>Company:</strong> {application.jobId?.company}</p>
      <p><strong>Applied on:</strong> {new Date(application.appliedDate).toLocaleString()}</p>
      <p><strong>Status:</strong> {application.status}</p>
      {application.feedback && (
        <div className="feedback">
          <h3>Recruiter Feedback</h3>
          <p>{application.feedback}</p>
        </div>
      )}
      <p><strong>Resume:</strong> <a href={application.resume} target="_blank">Download</a></p>
      <Link to="/my-applications">Back to Applications</Link>
    </div>
  );
};

export default ApplicationDetails;
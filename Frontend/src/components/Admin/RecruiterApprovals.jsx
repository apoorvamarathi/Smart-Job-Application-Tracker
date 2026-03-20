import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './Admin.css'; // optional component-specific styles

const RecruiterApprovals = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPendingRecruiters();
  }, []);

  const fetchPendingRecruiters = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/recruiters/pending');
      setRecruiters(data);
    } catch (error) {
      console.error('Error fetching pending recruiters:', error);
      setMessage({ type: 'error', text: 'Failed to load recruiters.' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await api.put(`/admin/recruiters/${userId}/approve`);
      // Remove from list after approval
      setRecruiters(recruiters.filter(r => r._id !== userId));
      setMessage({ type: 'success', text: 'Recruiter approved successfully.' });
    } catch (error) {
      console.error('Error approving recruiter:', error);
      setMessage({ type: 'error', text: 'Approval failed.' });
    }
  };

  const handleReject = async (userId) => {
    // Optional: prompt for rejection reason
    const reason = window.prompt('Enter rejection reason (optional):');
    try {
      await api.put(`/admin/recruiters/${userId}/reject`, { reason });
      setRecruiters(recruiters.filter(r => r._id !== userId));
      setMessage({ type: 'success', text: 'Recruiter rejected.' });
    } catch (error) {
      console.error('Error rejecting recruiter:', error);
      setMessage({ type: 'error', text: 'Rejection failed.' });
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading pending approvals...</div>;
  }

  return (
    <div className="recruiter-approvals">
      <h2>Recruiter Approval Requests</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      {recruiters.length === 0 ? (
        <p>No pending recruiter approvals.</p>
      ) : (
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((recruiter) => (
              <tr key={recruiter._id}>
                <td>{recruiter.name}</td>
                <td>{recruiter.email}</td>
                <td>{new Date(recruiter.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(recruiter._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(recruiter._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecruiterApprovals;

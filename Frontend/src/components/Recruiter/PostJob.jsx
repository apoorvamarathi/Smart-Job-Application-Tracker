
import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', form);
      setMessage('Job posted successfully!');
      setTimeout(() => navigate('/my-jobs'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error posting job');
    }
  };

  return (
    <div className="post-job">
      <h2>Post a New Job</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
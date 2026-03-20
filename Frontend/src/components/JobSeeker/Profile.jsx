// src/components/JobSeeker/Profile.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import FileUpload from '../Common/FileUpload';
import './JobSeeker.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    skills: [],
    education: [{ institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }],
    experience: [{ company: '', position: '', description: '', startDate: '', endDate: '' }],
    resume: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile/me');
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index, field, type) => {
    const updated = { ...profile };
    if (type === 'education') {
      updated.education[index][field] = e.target.value;
    } else if (type === 'experience') {
      updated.experience[index][field] = e.target.value;
    } else {
      updated[e.target.name] = e.target.value;
    }
    setProfile(updated);
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }]
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: '', position: '', description: '', startDate: '', endDate: '' }]
    });
  };

  const handleResumeUpload = (url) => {
    setProfile({ ...profile, resume: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/profile', profile);
      setMessage('Profile saved successfully');
    } catch (err) {
      setMessage('Error saving profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-form">
      <h2>My Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Skills (comma separated)</h3>
        <input
          type="text"
          name="skills"
          value={profile.skills.join(', ')}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })}
          placeholder="e.g. JavaScript, React, Node.js"
        />

        <h3>Education</h3>
        {profile.education.map((edu, idx) => (
          <div key={idx} className="education-entry">
            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, idx, 'institution', 'education')} />
            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, idx, 'degree', 'education')} />
            <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleChange(e, idx, 'fieldOfStudy', 'education')} />
            <input type="number" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleChange(e, idx, 'startYear', 'education')} />
            <input type="number" placeholder="End Year" value={edu.endYear} onChange={(e) => handleChange(e, idx, 'endYear', 'education')} />
          </div>
        ))}
        <button type="button" onClick={addEducation}>Add Education</button>

        <h3>Experience</h3>
        {profile.experience.map((exp, idx) => (
          <div key={idx} className="experience-entry">
            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, idx, 'company', 'experience')} />
            <input type="text" placeholder="Position" value={exp.position} onChange={(e) => handleChange(e, idx, 'position', 'experience')} />
            <textarea placeholder="Description" value={exp.description} onChange={(e) => handleChange(e, idx, 'description', 'experience')} />
            <input type="date" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleChange(e, idx, 'startDate', 'experience')} />
            <input type="date" placeholder="End Date" value={exp.endDate} onChange={(e) => handleChange(e, idx, 'endDate', 'experience')} />
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add Experience</button>

        <h3>Resume</h3>
        <FileUpload onUpload={handleResumeUpload} />
        {profile.resume && <p>Current: <a href={profile.resume} target="_blank" rel="noreferrer">View Resume</a></p>}

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import FileUpload from '../Common/FileUpload';
import './Recruiter.css';

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    companyName: '',
    description: '',
    website: '',
    location: '',
    logo: '',
    foundedYear: '',
    size: '', // e.g., '1-10', '11-50', etc.
    industry: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      // Assuming backend has endpoint GET /api/company/profile
      const { data } = await api.get('/company/profile');
      setCompany(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (url) => {
    setCompany({ ...company, logo: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming backend has endpoint POST /api/company/profile
      await api.post('/company/profile', company);
      setMessage('Company profile saved successfully!');
    } catch (err) {
      setMessage('Error saving company profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="company-profile">
      <h2>Company Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={company.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={company.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={company.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            name="industry"
            value={company.industry}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Company Size</label>
          <select name="size" value={company.size} onChange={handleChange}>
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501+">501+ employees</option>
          </select>
        </div>

        <div className="form-group">
          <label>Founded Year</label>
          <input
            type="number"
            name="foundedYear"
            value={company.foundedYear}
            onChange={handleChange}
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label>Company Logo</label>
          <FileUpload onUpload={handleLogoUpload} />
          {company.logo && (
            <div className="logo-preview">
              <img src={company.logo} alt="Company Logo" width="100" />
              <p>Current logo</p>
            </div>
          )}
        </div>

        <button type="submit">Save Company Profile</button>
      </form>
    </div>
  );
};

export default CompanyProfile;
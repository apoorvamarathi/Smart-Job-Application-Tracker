// src/components/Common/LoadingSpinner.jsx
import React from 'react';
import './Common.css'; // optional for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

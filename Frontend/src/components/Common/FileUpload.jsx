
import React, { useState } from 'react';
import api from '../../utils/api';

const FileUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUpload(data.fileUrl); // assume backend returns { fileUrl }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} disabled={uploading} />
      {uploading && <span>Uploading...</span>}
    </div>
  );
};

export default FileUpload;

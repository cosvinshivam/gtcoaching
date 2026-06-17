import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UploadCloud, Trash2, Copy } from 'lucide-react';

const ImageManager = () => {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get('http://localhost:8000/api/images/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('admin_token');
      await axios.post('http://localhost:8000/api/images/upload', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Uploaded successfully');
      setFile(null);
      fetchImages();
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`http://localhost:8000/api/images/${filename}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchImages();
    } catch (e) {
      console.error(e);
      alert('Delete failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Image Manager (AWS S3)</h1>
      
      <div className="admin-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="file" 
          className="admin-input" 
          style={{ marginBottom: 0, flex: 1 }}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
        <button className="admin-btn" onClick={handleUpload} disabled={!file || uploading}>
          <UploadCloud size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      <div className="admin-grid">
        {images.map((img, idx) => (
          <div key={idx} className="admin-card" style={{ padding: '1rem' }}>
            <div style={{ height: '150px', backgroundColor: 'var(--color-off-white)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={img.url} alt={img.filename} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-medium-grey)', marginBottom: '1rem', wordBreak: 'break-all' }}>
              {img.filename}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }} onClick={() => { navigator.clipboard.writeText(img.url); alert('URL copied!'); }}>
                <Copy size={16} /> Copy URL
              </button>
              <button className="admin-btn admin-btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDelete(img.filename)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageManager;

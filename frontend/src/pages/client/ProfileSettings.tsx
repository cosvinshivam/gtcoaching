import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../context/ClientAuthContext';
import axios from 'axios';
import { API_URL } from '../../config';

const ProfileSettings = () => {
  const { user, token, refreshUser } = useClientAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await refreshUser();
      setStatus('Profile updated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Failed to update profile.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '600px' }}>
      <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Profile Settings</h1>
      <p style={{ color: 'var(--color-medium-grey)', marginBottom: '3rem' }}>Update your personal details below.</p>

      {status && (
        <div style={{ padding: '1rem', marginBottom: '2rem', backgroundColor: status.includes('success') ? 'rgba(151, 255, 34, 0.1)' : 'rgba(255, 0, 0, 0.1)', color: status.includes('success') ? 'var(--color-primary)' : '#ff4d4f', borderRadius: 'var(--radius-sm)', border: `1px solid ${status.includes('success') ? 'var(--color-primary)' : '#ff4d4f'}` }}>
          {status}
        </div>
      )}

      <div style={{ backgroundColor: 'var(--color-grey)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Full Name</label>
            <input 
              type="text" 
              value={formData.full_name} 
              onChange={e => setFormData({...formData, full_name: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Phone Number</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Bio / Goals</label>
            <textarea 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', minHeight: '100px', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)', resize: 'vertical' }} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfileSettings;

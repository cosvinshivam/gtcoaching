import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const AdminProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUsername(res.data.username || '');
        setEmail(res.data.email || '');
        setFullName(res.data.full_name || '');
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      
      const payload: any = {
        username,
        email,
        full_name: fullName
      };
      
      if (password) {
        payload.password = password;
      }

      await axios.put(`${API_URL}/api/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Profile updated successfully!');
      
      // If username or password was changed, we might want to prompt them to log in again
      if (password) {
        toast('Password changed. Please log in again.');
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.response?.data?.detail || 'Failed to update profile.';
      toast.error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Admin Profile</h1>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <div style={{ background: 'var(--color-lime)', padding: '1rem', borderRadius: '50%', color: 'var(--color-black)' }}>
            <User size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-black)' }}>Account Settings</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Update your admin credentials and info</p>
          </div>
        </div>

        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Username</label>
            <input 
              type="text" 
              className="admin-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>New Password (leave blank to keep current)</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="admin-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', padding: 0 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              className="admin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Full Name</label>
            <input 
              type="text" 
              className="admin-input" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminProfile;

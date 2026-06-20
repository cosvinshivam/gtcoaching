import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import '../../styles/admin.css';
import { API_URL } from '../../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem('admin_token', response.data.access_token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-layout" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card" 
        style={{ width: '400px', maxWidth: '90%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--color-lime)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--color-black)' }}>
            <Lock size={32} />
          </div>
          <h2 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
          <p style={{ color: '#94a3b8' }}>Login to manage GTCoaching</p>
        </div>

        {error && <div style={{ color: 'white', marginBottom: '1rem', textAlign: 'center', background: '#ff4d4f', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>Username</label>
            <input 
              type="text" 
              className="admin-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="admin-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
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
          <button type="submit" className="admin-btn" style={{ width: '100%', justifyContent: 'center' }}>
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

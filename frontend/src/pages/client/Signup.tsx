import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', full_name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/signup', formData);
      // Auto login or redirect to login
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during signup');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-dark)', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        style={{ backgroundColor: 'var(--color-grey)', padding: '3rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px', border: '1px solid var(--color-border)' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-white)', fontSize: '2rem' }}>Create Account</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Full Name</label>
            <input 
              type="text" 
              value={formData.full_name} 
              onChange={e => setFormData({...formData, full_name: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Username</label>
            <input 
              type="text" 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-light-grey)' }}>Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              className="admin-input" 
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-border)' }} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-medium-grey)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

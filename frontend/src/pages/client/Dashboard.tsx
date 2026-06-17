import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../context/ClientAuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, token } = useClientAuth();
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/payments/my-purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchases(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchPurchases();
  }, [token]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: 'var(--color-medium-grey)', marginBottom: '3rem' }}>Here is an overview of your account.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Profile Summary Card */}
        <div style={{ backgroundColor: 'var(--color-grey)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ color: 'var(--color-white)', marginBottom: '1rem', fontSize: '1.25rem' }}>Profile Information</h3>
          <p style={{ color: 'var(--color-light-grey)', marginBottom: '0.5rem' }}><strong>Name:</strong> {user?.full_name || 'Not set'}</p>
          <p style={{ color: 'var(--color-light-grey)', marginBottom: '0.5rem' }}><strong>Email:</strong> {user?.email || 'Not set'}</p>
          <p style={{ color: 'var(--color-light-grey)', marginBottom: '1.5rem' }}><strong>Phone:</strong> {user?.phone || 'Not set'}</p>
          <Link to="/dashboard/profile" className="btn btn-secondary" style={{ display: 'inline-block' }}>Edit Profile</Link>
        </div>

        {/* Purchases Summary Card */}
        <div style={{ backgroundColor: 'var(--color-grey)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ color: 'var(--color-white)', marginBottom: '1rem', fontSize: '1.25rem' }}>Your Active Plans</h3>
          {purchases.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', color: 'var(--color-light-grey)' }}>
              {purchases.slice(0, 3).map(p => (
                <li key={p.id} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{p.plan_name}</span>
                  <span style={{ color: 'var(--color-primary)' }}>{p.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--color-medium-grey)', marginBottom: '1.5rem' }}>You have not purchased any plans yet.</p>
          )}
          <Link to="/dashboard/purchases" className="btn btn-primary" style={{ display: 'inline-block' }}>View All Plans</Link>
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;

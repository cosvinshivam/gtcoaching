import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Dashboard</h1>
      <div className="admin-grid">
        <div className="admin-card">
          <h3 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Total Content Blocks</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#38bdf8' }}>12</div>
        </div>
        <div className="admin-card">
          <h3 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Images in S3</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#818cf8' }}>45</div>
        </div>
        <div className="admin-card">
          <h3 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Payments Issued</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#34d399' }}>8</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

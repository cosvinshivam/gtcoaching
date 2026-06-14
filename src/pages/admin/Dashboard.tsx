import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Dashboard</h1>
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Total Content Blocks</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-black)' }}>12</div>
        </div>
        <div className="admin-card">
          <h3>Images in S3</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-black)' }}>45</div>
        </div>
        <div className="admin-card">
          <h3>Payments Issued</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-black)' }}>8</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

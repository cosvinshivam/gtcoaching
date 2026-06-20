import React from 'react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="page-wrapper"
      style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '60vh' }}
    >
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Terms and Conditions</h1>
        <div style={{ color: 'var(--color-dark-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to GT Executive Coaching. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Your use of our services constitutes your acceptance of these Terms and Conditions. If you do not agree to these terms, please do not use our services.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>2. Services Provided</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            GT Executive Coaching offers professional coaching, consulting, and related services. All services are subject to availability and may be modified or discontinued without prior notice.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>3. User Responsibilities</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            As a user of our services, you agree to provide accurate and complete information and to engage constructively in the coaching process. 
          </p>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#64748b' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsConditions;

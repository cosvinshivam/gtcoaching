import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="page-wrapper"
      style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '60vh' }}
    >
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Privacy Policy</h1>
        <div style={{ color: 'var(--color-dark-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At GT Executive Coaching, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We may collect personal information such as your name, email address, phone number, and professional details when you register for our coaching programs, subscribe to our newsletter, or contact us directly.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            The information we collect is used to provide and improve our coaching services, communicate with you, process transactions, and personalize your experience. We do not sell or rent your personal information to third parties.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>3. Data Security</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#64748b' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import { motion } from 'framer-motion';

const PaymentPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="page-wrapper"
      style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '60vh' }}
    >
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Payment Policy</h1>
        <div style={{ color: 'var(--color-dark-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            This Payment Policy applies to all purchases and financial transactions made through GT Executive Coaching. By making a payment, you agree to the terms outlined below.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>1. Payment Methods</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We accept online payments via secure third-party payment gateways (e.g., Ziina). All payments must be made in full according to the terms of your selected coaching plan or invoice.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>2. Refunds and Cancellations</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Refund policies may vary depending on the specific coaching package purchased. Generally, coaching services rendered are non-refundable. Cancellations must be made at least 48 hours in advance to avoid incurring charges for a missed session.
          </p>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem' }}>3. Secure Transactions</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We do not store your full credit card information on our servers. All sensitive financial data is encrypted and securely handled by our authorized payment processors.
          </p>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#64748b' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPolicy;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useClientAuth } from '../context/ClientAuthContext';
import './PaymentSuccess.css';
import { API_URL } from '../config';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { token } = useClientAuth();
  const [status, setStatus] = useState('Verifying your purchase...');

  useEffect(() => {
    window.scrollTo(0, 0);
    const confirmPurchase = async () => {
      const purchaseId = searchParams.get('purchase_id');
      if (purchaseId && token) {
        try {
          await axios.post(`${API_URL}/api/payments/confirm/${purchaseId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStatus('Payment Successful!');
        } catch (err) {
          console.error("Failed to confirm purchase", err);
          setStatus('Payment received, but verification failed.');
        }
      } else {
        setStatus('Payment Successful!');
      }
    };
    confirmPurchase();
  }, [searchParams, token]);

  return (
    <div className="payment-success-section section">
      <div className="container">
        <motion.div 
          className="payment-success-card card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="success-icon-wrapper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="success-icon" />
          </motion.div>
          
          <motion.h1 
            className="success-title h2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {status}
          </motion.h1>
          
          <motion.p 
            className="success-message p-large"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for your payment. Your transaction has been completed successfully and we've sent you an email receipt.
          </motion.p>

          <motion.div 
            className="success-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/dashboard/purchases" className="button-primary">
              View My Plans <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

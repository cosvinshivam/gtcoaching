import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, Copy } from 'lucide-react';

const PaymentManager = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentLink('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.post('http://localhost:8000/api/payments/issue-link', 
        { amount: parseFloat(amount), description, currency: 'AED' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentLink(res.data.payment_url);
    } catch (e) {
      console.error(e);
      alert('Failed to generate payment link. Ensure Ziina API keys are configured.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Issue Payment Link (Ziina)</h1>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleGenerate}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Amount (AED)</label>
            <input 
              type="number" 
              step="0.01"
              className="admin-input" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="e.g. 500.00"
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Description / Client Name</label>
            <input 
              type="text" 
              className="admin-input" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="e.g. Coaching Session - John Doe"
            />
          </div>
          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            <Link size={18} /> {loading ? 'Generating...' : 'Generate Link'}
          </button>
        </form>

        {paymentLink && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: '0.75rem' }}
          >
            <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Payment Link Generated Successfully!</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input type="text" readOnly value={paymentLink} className="admin-input" style={{ marginBottom: 0, flex: 1, background: 'rgba(15, 23, 42, 0.8)' }} />
              <button className="admin-btn" style={{ background: '#34d399' }} onClick={() => { navigator.clipboard.writeText(paymentLink); alert('Copied!'); }}>
                <Copy size={18} /> Copy
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentManager;

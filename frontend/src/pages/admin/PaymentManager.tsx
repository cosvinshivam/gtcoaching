import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../config';

const PLAN_OPTIONS = [
  "Gym",
  "Nutritionist",
  "Personal Training",
  "Recovery & Rehab",
  "Custom Plan"
];

const PaymentManager = () => {
  const [amount, setAmount] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [planName, setPlanName] = useState(PLAN_OPTIONS[0]);
  const [paymentLink, setPaymentLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentLink('');
    try {
      const token = localStorage.getItem('admin_token');
      const payload = {
        plan_name: planName,
        amount: parseFloat(amount),
        description: `Coaching Session - ${clientName} (${planName})`,
        currency: 'AED',
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone || null
      };

      const res = await axios.post(`${API_URL}/payments/issue-link`, 
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentLink(res.data.payment_url);
      toast.success('Payment link generated and Client profile created!');
      
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.response?.data?.detail || 'Failed to generate payment link. Ensure API is working.';
      toast.error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Issue Payment Link & Create Client</h1>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleGenerate}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Amount (AED)</label>
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
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Plan Type</label>
              <select 
                className="admin-input"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              >
                {PLAN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Client Full Name</label>
            <input 
              type="text" 
              className="admin-input" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              placeholder="e.g. John Doe"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Client Email</label>
              <input 
                type="email" 
                className="admin-input" 
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-black)', fontWeight: '600' }}>Contact Number (Optional)</label>
              <input 
                type="tel" 
                className="admin-input" 
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+971 50 123 4567"
              />
            </div>
          </div>

          <button type="submit" className="admin-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            <Link size={18} /> {loading ? 'Processing...' : 'Generate Link & Create Client'}
          </button>
        </form>

        {paymentLink && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: '0.75rem' }}
          >
            <h4 style={{ color: 'var(--color-black)', marginBottom: '0.5rem', fontWeight: '800' }}>Payment Link Generated!</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>Client account has been automatically created. They can log in using their email and the temporary password: <strong>Welcome123!</strong></p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input type="text" readOnly value={paymentLink} className="admin-input" style={{ marginBottom: 0, flex: 1, background: 'var(--color-white)' }} />
              <button className="admin-btn" onClick={() => { navigator.clipboard.writeText(paymentLink); toast.success('Copied to clipboard!'); }}>
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

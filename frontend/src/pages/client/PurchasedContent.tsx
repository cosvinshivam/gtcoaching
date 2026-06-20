import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../context/ClientAuthContext';
import axios from 'axios';
import { Package, CheckCircle, Clock } from 'lucide-react';
import { API_URL } from '../../config';

const PurchasedContent = () => {
  const { token } = useClientAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get(`${API_URL}/payments/my-purchases`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchases(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchPurchases();
  }, [token]);

  if (loading) return <div>Loading plans...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Plans</h1>
      <p style={{ color: 'var(--color-medium-grey)', marginBottom: '3rem' }}>Access your purchased coaching plans and programs.</p>

      {purchases.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--color-grey)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <Package size={48} color="var(--color-medium-grey)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>No active plans found</h3>
          <p style={{ color: 'var(--color-medium-grey)' }}>Head over to the pricing page to purchase a coaching plan.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {purchases.map(p => (
            <div key={p.id} style={{ backgroundColor: 'var(--color-grey)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', margin: 0 }}>{p.plan_name}</h3>
                {p.status === 'completed' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#97ff22', fontSize: '0.875rem' }}>
                    <CheckCircle size={16} /> Active
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffb020', fontSize: '0.875rem' }}>
                    <Clock size={16} /> Pending
                  </span>
                )}
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-light-grey)', fontSize: '0.875rem' }}>
                <span>Paid: {p.amount} {p.currency}</span>
                <span>{new Date(p.purchased_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PurchasedContent;

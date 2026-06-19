import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Client {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  plan_name: string;
  payment_status: string;
  payment_date?: string;
}

const ClientsList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchClients(page);
  }, [page]);

  const fetchClients = async (p: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`http://localhost:8000/api/auth/clients?page=${p}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(res.data.clients);
      setTotal(res.data.total);
    } catch (e: any) {
      console.error(e);
      toast.error('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Clients</h1>
        <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
          <Users size={20} />
          <span style={{ fontWeight: 600 }}>{total} Total Clients</span>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Client Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Email / Phone</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Active Plan</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading clients...</td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No clients found.</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-black)' }}>{client.full_name || 'N/A'}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>@{client.username}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ color: 'var(--color-black)' }}>{client.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{client.phone || 'No phone provided'}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                        {client.plan_name}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                        <span style={{ 
                          background: (client.payment_status === 'completed' || client.payment_status === 'Done') ? '#dcfce7' : client.payment_status === 'pending' ? '#fef3c7' : '#f1f5f9', 
                          color: (client.payment_status === 'completed' || client.payment_status === 'Done') ? '#16a34a' : client.payment_status === 'pending' ? '#d97706' : '#64748b',
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '1rem', 
                          fontSize: '0.85rem', 
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}>
                          {client.payment_status}
                        </span>
                        {client.payment_date && (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            {new Date(client.payment_date).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && total > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} entries
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                style={{ padding: '0.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0.25rem', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
              >
                <ChevronLeft size={18} />
              </button>
              <span style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0.25rem', fontWeight: 600 }}>
                {page} / {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                style={{ padding: '0.5rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0.25rem', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ClientsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, ChevronLeft, ChevronRight, Edit2, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../config';

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

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients(page);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [page, search, startDate, endDate]);

  const fetchClients = async (p: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      let url = `${API_URL}/api/auth/clients?page=${p}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (startDate) url += `&start_date=${startDate}`;
      if (endDate) url += `&end_date=${endDate}`;

      const res = await axios.get(url, {
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

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setEditName(client.full_name || '');
    setEditEmail(client.email || '');
    setEditPhone(client.phone || '');
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(`${API_URL}/api/auth/clients/${editingClient.id}`, {
        full_name: editName,
        email: editEmail,
        phone: editPhone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Client updated successfully');
      setEditingClient(null);
      fetchClients(page);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || 'Failed to update client');
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Clients</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by name, email, phone or date..." 
              className="admin-input"
              style={{ marginBottom: 0, paddingLeft: '2.5rem', width: '300px', borderRadius: '2rem' }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="date"
              className="admin-input"
              style={{ marginBottom: 0, padding: '0.5rem 1rem', width: 'auto', borderRadius: '2rem' }}
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
            />
            <span style={{ color: '#94a3b8' }}>-</span>
            <input 
              type="date"
              className="admin-input"
              style={{ marginBottom: 0, padding: '0.5rem 1rem', width: 'auto', borderRadius: '2rem' }}
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
            />
          </div>
          <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
            <Users size={20} />
            <span style={{ fontWeight: 600 }}>{total} Total Clients</span>
          </div>
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
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}></th>
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
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button onClick={() => handleEdit(client)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Edit2 size={16} />
                      </button>
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

      {/* EDIT MODAL */}
      {editingClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-black)' }}>Edit Client</h3>
              <button onClick={() => setEditingClient(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={saveEdit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  style={{ marginBottom: 0 }}
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                  required 
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email</label>
                <input 
                  type="email" 
                  className="admin-input" 
                  style={{ marginBottom: 0 }}
                  value={editEmail} 
                  onChange={e => setEditEmail(e.target.value)} 
                  required 
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Phone</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  style={{ marginBottom: 0 }}
                  value={editPhone} 
                  onChange={e => setEditPhone(e.target.value)} 
                />
              </div>
              <button type="submit" className="admin-btn" style={{ width: '100%' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ClientsList;

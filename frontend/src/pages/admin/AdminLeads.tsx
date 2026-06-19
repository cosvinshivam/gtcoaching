import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, X, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchLeads(page);
  }, [page]);

  const fetchLeads = async (p: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`http://localhost:8000/api/scorecards?page=${p}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data.leads);
      setTotal(res.data.total);
    } catch (e) {
      console.error('Failed to fetch leads', e);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  const getPillarColor = (score: number) => {
    if (score < 10) return '#ef4444'; // Red
    if (score < 20) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  };

  const pillars = [
    "Training Structure",
    "Nutrition Awareness",
    "Sleep and Recovery",
    "Body Composition Awareness",
    "Consistency and Systems"
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Scorecard Leads</h1>
        <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} /> {total} Leads Generated
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Lead Details</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Contact</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem', textAlign: 'center' }}>Total Score</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading leads...</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  <FileText size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                  <p>No scorecards submitted yet.</p>
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-black)', fontSize: '1.05rem' }}>{lead.name}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}><Mail size={14}/> {lead.email}</div>
                    {lead.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14}/> {lead.phone}</div>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <span style={{ 
                      background: lead.total_score >= 100 ? '#dcfce7' : lead.total_score >= 50 ? '#fef9c3' : '#fee2e2',
                      color: lead.total_score >= 100 ? '#16a34a' : lead.total_score >= 50 ? '#ca8a04' : '#dc2626',
                      padding: '0.25rem 0.75rem', borderRadius: '1rem', fontWeight: 700, fontSize: '1rem' 
                    }}>
                      {lead.total_score} / 150
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                    {new Date(lead.submitted_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button onClick={() => setSelectedLead(lead)} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                      View Breakdown
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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

      {/* LEAD MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: 'white', borderRadius: '1rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: 'var(--color-black)' }}>{selectedLead.name}'s Scorecard</h2>
                <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#64748b" /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Email</div>
                  <div style={{ fontWeight: 500, color: 'var(--color-black)' }}>{selectedLead.email}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Phone</div>
                  <div style={{ fontWeight: 500, color: 'var(--color-black)' }}>{selectedLead.phone || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Score</div>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-black)' }}>{selectedLead.total_score} / 150</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Category</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-black)' }}>
                    {selectedLead.total_score < 50 ? 'Running on Guesswork' : selectedLead.total_score <= 100 ? 'Some Pieces, Major Gaps' : 'Foundation Built, Precision Needed'}
                  </div>
                </div>
              </div>

              <h3 style={{ marginBottom: '1rem', color: 'var(--color-black)', fontSize: '1.2rem' }}>Pillar Breakdown</h3>
              
              {[1, 2, 3, 4, 5].map((p, idx) => {
                const pillarScore = selectedLead[`pillar_${p}_score`];
                return (
                  <div key={p} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-black)' }}>{pillars[idx]}</span>
                      <span style={{ fontWeight: 800, color: getPillarColor(pillarScore) }}>{pillarScore} / 30</span>
                    </div>
                    {/* Progress Bar */}
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(pillarScore / 30) * 100}%`, background: getPillarColor(pillarScore) }} />
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
                <a href={`mailto:${selectedLead.email}`} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                  Email Lead
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default AdminLeads;

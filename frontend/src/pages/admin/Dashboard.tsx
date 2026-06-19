import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { FileText, Image as ImageIcon, CreditCard, DollarSign, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await axios.get('http://localhost:8000/api/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (e) {
        console.error('Failed to fetch stats', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-medium-grey)' }}>
        Loading dashboard...
      </div>
    );
  }

  const chartData = stats?.chart_data || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Dashboard Overview</h1>
      
      {/* KPI Cards */}
      <div className="admin-grid" style={{ marginBottom: '2.5rem' }}>
        <motion.div className="admin-card" whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Total Revenue</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-black)', letterSpacing: '-0.01em' }}>
                AED {stats?.total_revenue?.toLocaleString() || 0}
              </div>
            </div>
            <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '50%', color: '#16a34a' }}>
              <DollarSign size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div className="admin-card" whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Total Users</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-black)', letterSpacing: '-0.01em' }}>
                {stats?.total_users || 0}
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '50%', color: '#3b82f6' }}>
              <Users size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div className="admin-card" whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Payments Issued</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-black)', letterSpacing: '-0.01em' }}>
                {stats?.payments_issued || 0}
              </div>
            </div>
            <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '50%', color: '#d97706' }}>
              <CreditCard size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div className="admin-card" whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Content Blocks</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-black)', letterSpacing: '-0.01em' }}>
                {stats?.content_blocks || 0}
              </div>
            </div>
            <div style={{ background: '#f3e8ff', padding: '0.75rem', borderRadius: '50%', color: '#9333ea' }}>
              <FileText size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Revenue Area Chart */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-black)', marginBottom: '1.5rem' }}>Revenue Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-lime)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-lime)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#8884d8" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#8884d8" axisLine={false} tickLine={false} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: 'var(--color-black)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-lime)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Bar Chart */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-black)', marginBottom: '1.5rem' }}>User Growth</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#8884d8" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#8884d8" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

export default Dashboard;

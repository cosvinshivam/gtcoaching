import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useClientAuth } from '../context/ClientAuthContext';
import { LayoutDashboard, User, Package, LogOut } from 'lucide-react';

const ClientLayout = () => {
  const { user, loading, logout } = useClientAuth();
  const location = useLocation();

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/purchases', label: 'My Plans', icon: <Package size={20} /> },
    { path: '/dashboard/profile', label: 'Profile Settings', icon: <User size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-dark)' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: 'var(--color-grey)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-white)', fontSize: '1.5rem', fontWeight: 'bold' }}>Client Portal</h2>
          <p style={{ color: 'var(--color-medium-grey)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Welcome, {user.full_name || user.username}</p>
        </div>
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-sm)', textDecoration: 'none', 
                  color: isActive ? 'var(--color-dark)' : 'var(--color-light-grey)', 
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--color-border)' }}>
          <button 
            onClick={logout} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              width: '100%', background: 'transparent', border: 'none', color: '#ff4d4f', 
              cursor: 'pointer', fontSize: '1rem', textAlign: 'left', borderRadius: 'var(--radius-sm)' 
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;

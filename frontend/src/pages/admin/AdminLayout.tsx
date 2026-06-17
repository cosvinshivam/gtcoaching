import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, CreditCard, LogOut } from 'lucide-react';
import '../../styles/admin.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          GTC Admin
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            Content
          </NavLink>
          <NavLink to="/admin/images" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <ImageIcon size={20} />
            Images (S3)
          </NavLink>
          <NavLink to="/admin/payments" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <CreditCard size={20} />
            Payments (Ziina)
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} className="admin-nav-item" style={{ background: 'transparent', border: 'none', width: '100%', cursor: 'pointer' }}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

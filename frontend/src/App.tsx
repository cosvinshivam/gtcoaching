import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Coaching from './pages/Coaching';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Team from './pages/Team';
import TeamMember from './pages/TeamMember';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';

import Programs from './pages/Programs';
import PaymentSuccess from './pages/PaymentSuccess';

import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ContentManager from './pages/admin/ContentManager';
import ImageManager from './pages/admin/ImageManager';
import PaymentManager from './pages/admin/PaymentManager';

import { ClientAuthProvider } from './context/ClientAuthContext';
import ClientLayout from './layouts/ClientLayout';
import ClientLogin from './pages/client/ClientLogin';
import Signup from './pages/client/Signup';
import ClientDashboard from './pages/client/Dashboard';
import ProfileSettings from './pages/client/ProfileSettings';
import PurchasedContent from './pages/client/PurchasedContent';

function App() {
  return (
    <ClientAuthProvider>
      <Router>
        <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="images" element={<ImageManager />} />
          <Route path="payments" element={<PaymentManager />} />
        </Route>

        {/* Client Routes */}
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="purchases" element={<PurchasedContent />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="app-wrapper">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team-member/:id" element={<TeamMember />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-posts/:id" element={<BlogPost />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
    </ClientAuthProvider>
  );
}

export default App;

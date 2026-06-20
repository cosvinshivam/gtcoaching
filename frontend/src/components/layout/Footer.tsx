import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import { ASSETS_URL } from '../../config';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v1">
      <div className="container">
        <div className="footer-main-v1">
          <div className="footer-col-about">
            <Link to="/" className="logo-v1">
              <div className="logo-img-wrapper">
                <img src={`${ASSETS_URL}/logo-dark.jpg`} alt="GT EXECUTIVE COACHING" className="logo-img-footer" />
              </div>
            </Link>
            <p className="footer-mission">
              Elite Executive Coaching for high-performance leaders. We empower executives and teams to achieve exceptional success through tailored coaching strategies.
            </p>
            <div className="footer-social-v1" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="https://www.linkedin.com/in/goran-tololeski-584488111/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.8'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/gtcoaching.dubai/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.8'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div className="footer-col-links">
            <h4>Quick links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/payment-policy">Payment Policy</Link></li>
            </ul>
          </div>



          <div className="footer-col-contact">
            <h4>Contact us</h4>
            <div className="contact-details-v1">

              <p>admin@gt-coaching.com</p>
            </div>
            <Link to="/contact" className="footer-cta-btn" style={{ textDecoration: 'none' }}>
              Get in touch <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom-v1">
          <p>© {new Date().getFullYear()} GT Executive Coaching. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

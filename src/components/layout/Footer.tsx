import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import logoDark from '../../assets/logo-dark.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v1">
      <div className="container">
        <div className="footer-main-v1">
          <div className="footer-col-about">
            <Link to="/" className="logo-v1">
              <div className="logo-img-wrapper">
                <img src={logoDark} alt="GT EXECUTIVE COACHING" className="logo-img-footer" />
              </div>
            </Link>
            <p className="footer-mission">
              Elite Executive Coaching for high-performance leaders. We empower executives and teams to achieve exceptional success through tailored coaching strategies.
            </p>
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

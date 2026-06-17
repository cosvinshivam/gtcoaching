import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import logoLight from '../../assets/logo-light.jpg';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar-v1 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content-v1">
        <Link to="/" className="logo-v1">
          <div className="logo-img-wrapper">
            <img src={logoLight} alt="GT EXECUTIVE COACHING" className="logo-img" />
          </div>
        </Link>

        <div className={`nav-links-v1 ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
          <Link to="/programs" className={location.pathname === '/programs' ? 'active' : ''}>Programs</Link>
        </div>

        <div className="nav-actions-v1">
          <Link to="/contact" className="btn-navbar">
            Join now <ArrowUpRight size={18} />
          </Link>
          <button className="menu-toggle-v1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

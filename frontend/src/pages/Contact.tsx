import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Contact.css';
import { ASSETS_URL } from '../config';

const Contact = () => {
  return (
    <div className="contact-v2">
      {/* Hero Section */}
      <section className="contact-hero-v2">
        <div className="container">
          <div className="contact-hero-image-v2">
            <img src={`${ASSETS_URL}/contact-hero.png`} alt="Coaches" />
          </div>
        </div>
      </section>



      {/* Form Section */}
      <section className="contact-form-section section">
        <div className="container form-layout-v2">
          <div className="form-header-v2">
            <h2 className="h2">Send us a message</h2>
            <p className="p-large">Whether you're looking to start coaching or have a general inquiry, our team is ready to assist you on your journey.</p>
          </div>

          <form className="contact-form-v2">
            <div className="form-grid-v2">
              <div className="form-group-v2">
                <label>Your name*</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group-v2">
                <label>Email address*</label>
                <input type="email" placeholder="Email address" required />
              </div>
              <div className="form-group-v2">
                <label>Phone number*</label>
                <input type="tel" placeholder="Phone number" required />
              </div>
              <div className="form-group-v2">
                <label>Subject</label>
                <input type="text" placeholder="Subject" />
              </div>
            </div>
            <div className="form-group-v2 full-width">
              <label>Message</label>
              <textarea rows={6} placeholder="How can we help?"></textarea>
            </div>
            
            <button type="submit" className="btn-black-v2">
              Submit message 
              <div className="icon-circle-lime">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

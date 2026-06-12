import React from 'react';
import FAQSection from '../components/sections/FAQ';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-page">
      {/* FAQ Hero */}
      <section className="faq-hero">
        <div className="container">
        </div>
      </section>

      {/* Main FAQ Content */}
      <FAQSection />

      {/* CTA Section */}
      <section className="faq-cta section">
        <div className="container">
          <div className="cta-box-v2">
            <h2 className="h2">Still have questions?</h2>
            <p className="p-large">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <button className="btn-black-v2">
              Get in touch
              <div className="icon-circle-lime">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

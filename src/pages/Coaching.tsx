import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Shield, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';
import './Coaching.css';
import coachingHeroImg from '../assets/coaching-hero.png';

const Coaching = () => {
  return (
    <div className="coaching-v2">
      {/* Hero Section */}
      <section className="coaching-hero-v2">
        <div className="container">
          <div className="coaching-hero-image-v2">
            <img src={coachingHeroImg} alt="Coaching Action" />
          </div>
        </div>
      </section>

      {/* Stats/Transform Section */}
      <section className="coaching-stats-section section">
        <div className="container coaching-stats-grid-v2">
          <div className="stats-badge-circle">
            <div className="circle-inner">
              <span className="val">24</span>
              <span className="plus-badge">+</span>
            </div>
            <p>Years of experience</p>
          </div>
          <div className="stats-text-content-v2">
            <span className="badge-small">Transform your life</span>
            <h2 className="h2">Building champions for over 24 years</h2>
            <p className="p-large">
              Our coaching philosophy is built on decades of experience working with elite athletes across multiple disciplines. We don't just teach the game; we master the performance mindset.
            </p>
          </div>
        </div>
      </section>

      {/* Expert Support Section (Numbered Steps) */}
      <section className="expert-support-section section">
        <div className="container support-grid-v2">
          <div className="support-left">
            <span className="badge-small">Our Expertise</span>
            <h2 className="h2">Expert coaching support</h2>
            <div className="numbered-steps-v2">
              <div className="step-item-v2">
                <span className="step-num">01</span>
                <div className="step-info">
                  <h3>Team coaching</h3>
                  <p>Collaborative strategies for group performance.</p>
                </div>
              </div>
              <div className="step-item-v2">
                <span className="step-num">02</span>
                <div className="step-info">
                  <h3>Strategies</h3>
                  <p>In-depth tactical planning for game success.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="support-right-grid">
            <div className="service-card-v2">
              <div className="s-icon-v2"><Target size={24} /></div>
              <h3>Skill development</h3>
              <p>Achieve peak performance with sessions tailored to your goals.</p>
              <a href="#">View more <ArrowUpRight size={18} /></a>
            </div>
            <div className="service-card-v2">
              <div className="s-icon-v2"><Users size={24} /></div>
              <h3>Youth programs</h3>
              <p>Engaging sessions that boost agility and coordination.</p>
              <a href="#">View more <ArrowUpRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Grid */}
      <section className="coaching-cta-grid section">
        <div className="container">
          <div className="cta-grid-header">
            <h2 className="h2">Unlock your full athletic potential with proven coaching methods</h2>
          </div>
          <div className="cta-features-v2">
            {[
              { title: "Expert guidance", desc: "Coaching from world-class elite level professionals." },
              { title: "Customized plans", desc: "Tailored strategies for your unique athletic profile." },
              { title: "Confidence & strength", desc: "Building the mental and physical foundation for success." },
              { title: "Progress tracking", desc: "Data-driven insights to monitor every step of your journey." }
            ].map((f, i) => (
              <div key={i} className="cta-feat-card-v2">
                <CheckCircle size={24} className="icon-lime" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;

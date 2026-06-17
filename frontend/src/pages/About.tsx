import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, Target, Zap, Shield, Users, Mail } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import './About.css';
import aboutHeroImg from '../assets/about-hero.png';

const defaultStats = [
  { label: "Retention Rate", value: "99%" },
  { label: "Years Experience", value: "24+" },
  { label: "Athletes Trained", value: "25k+" },
  { label: "Design Awards", value: "40+" }
];

const defaultValues = [
  {
    title: "Coaching strategies",
    desc: "Achieve peak performance with sessions tailored to your goals.",
    icon: <Target size={24} />
  },
  {
    title: "Virtual training",
    desc: "Engaging sessions that boost your agility and coordination.",
    icon: <Zap size={24} />
  },
  {
    title: "Team coaching",
    desc: "Improve your batting technique and overall game strategy.",
    icon: <Users size={24} />
  }
];

const defaultAccordionItems = [
  { title: "Group training", content: "Collaborative programs designed to strengthen teamwork and boost collective performance." },
  { title: "1-on-1 coaching", content: "Personalized sessions focused on your individual progress and technique." },
  { title: "Sport-specific", content: "Tailored drills and strategies for your chosen athletic discipline." },
  { title: "Virtual sessions", content: "High-quality coaching delivered remotely to fit your busy schedule." }
];

const About = () => {
  const { getContent } = useSiteContent();
  const [openIndex, setOpenIndex] = useState(0);

  let stats = defaultStats;
  try { stats = JSON.parse(getContent('about_stats', JSON.stringify(defaultStats))); } catch(e) {}

  let valuesList = defaultValues;
  try { 
    // we use defaultValues for icons, but allow text overrides
    const parsed = JSON.parse(getContent('about_values', JSON.stringify(defaultValues.map(v => ({title: v.title, desc: v.desc})))));
    valuesList = defaultValues.map((v, i) => ({...v, title: parsed[i]?.title || v.title, desc: parsed[i]?.desc || v.desc}));
  } catch(e) {}

  return (
    <div className="about-v2">
      {/* Hero Section */}
      <section className="about-hero-v2">
        <div className="container">

          <div className="about-hero-image-v2">
            <img src={getContent('about_hero_img', aboutHeroImg)} alt="GT Executive Coaching Hero" />
          </div>
        </div>
      </section>

      {/* Stats Section (Behind the Brand) */}
      <section className="about-stats-section section">
        <div className="container about-stats-grid-v2">
          <div className="stats-image-v2">
            <img src={getContent('about_stats_img', "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800")} alt="Golf Training" />
          </div>
          <div className="stats-content-v2">
            <span className="badge-small">{getContent('about_badge', 'Behind the brand')}</span>
            <h2 className="h2">{getContent('about_heading', 'Building champions')}</h2>
            <p className="p-large">{getContent('about_desc', 'We combine advanced data metrics with elite-level coaching experience to provide the best performance enhancement systems in the world.')}</p>
            
            <div className="stats-numbers-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-num-item">
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="about-values-section section">
        <div className="container">
          <div className="values-grid-v2">
            {valuesList.map((v, i) => (
              <div key={i} className="value-card-v2">
                <div className="value-icon-v2">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <button className="text-btn">View programs <ArrowUpRight size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-box-v2">
            <h2 className="h2">{getContent('about_cta_title', 'Start your personalized coaching journey today')}</h2>
            <div className="cta-actions-v2">
              <Link to="/contact" className="button-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get started</Link>
              <Link to="/programs" className="button-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>View programs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, TrendingUp } from 'lucide-react';
import './Services.css';

const services = [
  {
    title: 'Precision Coaching',
    description: 'Data-driven training programs tailored to your unique physiological profile and performance goals.',
    icon: <Target size={32} />,
  },
  {
    title: 'Metabolic Optimization',
    description: 'Advanced nutritional protocols to fuel your performance and accelerate recovery between sessions.',
    icon: <Zap size={32} />,
  },
  {
    title: 'Injury Prevention',
    description: 'Scientific biomechanical analysis to identify and eliminate weaknesses before they lead to downtime.',
    icon: <Shield size={32} />,
  },
  {
    title: 'Mindset Training',
    description: 'Psychological conditioning to build the mental resilience required for elite-level competition.',
    icon: <TrendingUp size={32} />,
  },
];

const Services = () => {
  return (
    <section className="services section">
      <div className="container">
        <div className="section-header">
          <span className="badge">Our Expertise</span>
          <h2 className="h2">Engineered for <span>Results.</span></h2>
          <p className="p-large">We combine science and elite experience to provide the most comprehensive coaching system available.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="h3">{service.title}</h3>
              <p className="p-medium">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

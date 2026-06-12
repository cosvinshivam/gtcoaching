import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Target, Users } from 'lucide-react';
import './UnlockPotential.css';
import fieldGrassImg from '../../assets/field-grass.png';

const UnlockPotential = () => {
  return (
    <section className="unlock-potential">
      <div className="container unlock-grid">
        <motion.div 
          className="unlock-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={fieldGrassImg} alt="Sports Field" />
        </motion.div>

        <motion.div 
          className="unlock-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="h2 unlock-title">
            Unlock your full athletic potential with expert coaching tailored to your goals. Whether you're just starting or going pro, we're here to guide every step of your fitness journey.
          </h2>
          
          <a href="#" className="assessment-link">
            Claim your free assessment <ArrowUpRight size={20} />
          </a>

          <div className="service-cards">
            <div className="service-mini-card">
              <div className="mini-icon">
                <Target size={24} />
              </div>
              <div className="mini-text">
                <h3>Personal coaching</h3>
                <p>One-on-one sessions focused on your unique goals, providing personalized strategies for growth and success.</p>
              </div>
            </div>

            <div className="service-mini-card">
              <div className="mini-icon">
                <Users size={24} />
              </div>
              <div className="mini-text">
                <h3>Group & team training</h3>
                <p>Collaborative programs designed to strengthen teamwork, boost performance, and achieve objectives.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnlockPotential;

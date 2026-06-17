import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './ProvenMethods.css';
import archerImg from '../../assets/archer.png';

const methods = [
  {
    id: 1,
    title: "Personalized Training Plans",
    description: "Customized workouts tailored to your specific goals and fitness level, ensuring every session is effective and safe."
  },
  {
    id: 2,
    title: "Proven Methods",
    description: "We use science-backed training techniques that have been tested and refined across thousands of athletes."
  },
  {
    id: 3,
    title: "Experienced Coaches",
    description: "Our coaches are elite-level professionals with years of experience in high-performance sports environments."
  },
  {
    id: 4,
    title: "Continuous Support",
    description: "Daily monitoring and weekly check-ins to ensure you're on track and making consistent progress toward your goals."
  }
];

const ProvenMethods = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="proven-methods">
      <div className="container methods-grid">
        <div className="methods-left">
          <div className="badge-small">Our Methods</div>
          <h2 className="h2 methods-title">Proven methods for exceptional results</h2>
          
          <div className="methods-accordion">
            {methods.map((method) => (
              <div 
                key={method.id} 
                className={`method-item ${activeId === method.id ? 'active' : ''}`}
                onClick={() => setActiveId(method.id)}
              >
                <div className="method-header">
                  <span className="method-number">{method.id.toString().padStart(2, '0')}</span>
                  <h3>{method.title}</h3>
                  <div className="toggle-icon">
                    {activeId === method.id ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                <AnimatePresence>
                  {activeId === method.id && (
                    <motion.div 
                      className="method-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{method.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="methods-right"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="archer-wrapper">
            <img src={archerImg} alt="Archer" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProvenMethods;

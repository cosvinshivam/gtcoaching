import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Transformations.css';

const testimonials = [
  {
    name: "Miracle Bergson",
    role: "Marathon Runner",
    quote: "Engaging sessions that boosted my agility, coordination, and overall athletic performance."
  },
  {
    name: "Jaylon Siphron",
    role: "Fitness Enthusiast",
    quote: "The training significantly improved my batting technique and overall game strategy within weeks."
  },
  {
    name: "Davis Curtis",
    role: "Youth Tennis Player",
    quote: "Mental conditioning sessions improved my concentration during matches, leading to better performance."
  },
  {
    name: "Johnathan Carter",
    role: "Recreational Swimmer",
    quote: "Personalized feedback helped me correct my stroke and shave seconds off my lap times."
  }
];

const Transformations = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="transformations-v1">
      <div className="container">
        <div className="transform-header">
          <div className="rating-summary">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span>4.9/5 from over 600 reviews</span>
          </div>
          <h2 className="h2">What athletes are saying about their coaching experience</h2>
        </div>

        <div className="testimonial-slider">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              className="testimonial-card-v1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="quote">"{testimonials[index].quote}"</p>
              <div className="testimonial-footer">
                <div className="author-info">
                  <span className="author-name">{testimonials[index].name}</span>
                  <span className="author-role">{testimonials[index].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="slider-controls">
            <button onClick={prev} className="control-btn"><ChevronLeft size={24} /></button>
            <button onClick={next} className="control-btn"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformations;

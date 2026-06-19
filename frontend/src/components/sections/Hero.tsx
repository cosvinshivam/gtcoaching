import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import './Hero.css';
import { ASSETS_URL } from '../../config';

const Hero = () => {
  const { getContent } = useSiteContent();

  return (
    <section className="hero-v1">
      <div className="container hero-container">
        {/* Left Content */}
        <motion.div 
          className="hero-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="rating-badge">
            <div className="avatars">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80" alt="Avatar" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80" alt="Avatar" />
              <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80" alt="Avatar" />
            </div>
            <span>{getContent('hero_review_text', 'Rated 4.9/5 from over 600 reviews')}</span>
          </div>
          
          <h1 className="h1 hero-title">
            {getContent('hero_title', 'Unleash your potential with expert sports coaching')}
          </h1>
          
          <button className="button-primary hero-btn">
            {getContent('hero_btn_text', 'Start your training')} <ArrowUpRight size={20} />
          </button>
        </motion.div>

        {/* Right Content / Images */}
        <div className="hero-right">
          <motion.div 
            className="main-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img src={getContent('hero_main_img', `${ASSETS_URL}/hero-bg-gym-modern.png`)} alt="Gym Background" className="hero-cyclist" />
          </motion.div>

          <motion.div 
            className="info-box"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="split-image">
              <div className="split-left">
                <img src={getContent('hero_split_img_1', `${ASSETS_URL}/hero-split-1-gym-modern.png`)} alt="Athlete Workout" />
              </div>
              <div className="split-right">
                <img src={getContent('hero_split_img_2', `${ASSETS_URL}/hero-split-2-gym-modern.png`)} alt="Gym Coach" />
              </div>
            </div>
            <div className="info-content">
              <p className="p-medium">
                {getContent('hero_subtitle', 'Elevating athletes daily through coaching, proven methods, and dedicated support')}
              </p>
              <button className="arrow-btn">
                <ArrowUpRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Coffee, Utensils, Target, Users, ArrowUpRight, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';
import './Programs.css';

const defaultPrograms = [
  {
    title: "Personal Health",
    description: "A holistic approach to optimizing your daily health, sleep, and overall wellness.",
    icon: <Heart size={32} />,
    color: "#e6ff00",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Fitness & Conditioning",
    description: "Build strength, endurance, and agility with our rigorous fitness coaching.",
    icon: <Activity size={32} />,
    color: "#ffffff",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Recovery Plans",
    description: "Accelerate your muscle recovery and prevent injuries with targeted therapy.",
    icon: <Coffee size={32} />,
    color: "#e6ff00",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Meal Plans",
    description: "Personalized nutrition strategies tailored to fuel your unique athletic profile.",
    icon: <Utensils size={32} />,
    color: "#ffffff",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Golf Coaching",
    description: "Master your swing and improve your game strategy on the green.",
    icon: <Target size={32} />,
    color: "#e6ff00",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Tennis Coaching",
    description: "Refine your technique, footwork, and mental toughness on the court.",
    icon: <Activity size={32} />,
    color: "#ffffff",
    image: "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Team Sports",
    description: "Collaborative programs designed to strengthen teamwork and boost collective performance.",
    icon: <Users size={32} />,
    color: "#e6ff00",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Cycling",
    description: "Build endurance, leg strength, and cardiovascular health with our structured cycling program.",
    icon: <Bike size={32} />,
    color: "#ffffff",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600"
  }
];

const Programs = () => {
  const { getContent } = useSiteContent();

  let programsList = defaultPrograms;
  try {
    const parsed = JSON.parse(getContent('programs_list', JSON.stringify(defaultPrograms.map(p => ({title: p.title, description: p.description, image: p.image})))));
    programsList = defaultPrograms.map((p, i) => ({
      ...p,
      title: parsed[i]?.title || p.title,
      description: parsed[i]?.description || p.description,
      image: parsed[i]?.image || p.image
    }));
  } catch(e) {}

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="container">
          <div className="programs-hero-content">
            <span className="badge-lime">{getContent('programs_badge', 'Our Courses')}</span>
            <h1 className="h1">{getContent('programs_title', 'Explore our programs')}</h1>
            <p className="p-large">{getContent('programs_desc', 'From fitness and recovery to personalized meal plans, discover the right course to elevate your performance.')}</p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="programs-grid-section section">
        <div className="container">
          <div className="programs-grid">
            {programsList.map((program, index) => (
              <motion.div 
                key={index}
                className="program-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="program-image-wrapper">
                  <img src={program.image} alt={program.title} />
                  <div className="program-icon-overlay" style={{ backgroundColor: program.color }}>
                    {program.icon}
                  </div>
                </div>
                <div className="program-info">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <Link to="/contact" className="program-link">
                    Enroll now <ArrowUpRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="programs-cta section">
        <div className="container">
          <div className="cta-box-v2">
            <h2 className="h2">{getContent('programs_cta_title', 'Ready to transform your life?')}</h2>
            <p className="p-large">{getContent('programs_cta_desc', 'Join our expert coaches and start your personalized journey today.')}</p>
            <div className="cta-actions-v2">
              <Link to="/contact" className="button-primary" style={{ textDecoration: 'none' }}>Get started</Link>
              <Link to="/pricing" className="button-secondary" style={{ textDecoration: 'none' }}>View pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;

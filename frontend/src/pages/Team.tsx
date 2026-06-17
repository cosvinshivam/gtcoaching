import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Team.css';

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const coaches = [
  {
    id: 'lincoln-donin',
    name: "Lincoln Donin",
    role: "Fitness coach",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  },
  {
    id: 'cristofer-press',
    name: "Cristofer Press",
    role: "Pitching coach",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  },
  {
    id: 'ruben-press',
    name: "Ruben Press",
    role: "Running coach",
    image: "https://images.unsplash.com/photo-149175235542e-001d674e67ca?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  },
  {
    id: 'giana-herwitz',
    name: "Giana Herwitz",
    role: "Tennis coach",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  },
  {
    id: 'marcus-vetrovs',
    name: "Marcus Vetrovs",
    role: "Swimming coach",
    image: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  },
  {
    id: 'zaire-carder',
    name: "Zaire Carder",
    role: "Basketball coach",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600",
    socials: { fb: "#", li: "#", ig: "#" }
  }
];

const Team = () => {
  return (
    <div className="team-page">
      {/* Team Hero */}
      <section className="team-hero">
        <div className="container">
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section section">
        <div className="container">
          <div className="team-grid">
            {coaches.map((coach, index) => (
              <Link 
                to={`/team-member/${coach.id}`} 
                key={coach.id}
                style={{ textDecoration: 'none' }}
              >
                <motion.div 
                  className="coach-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="coach-image-wrapper">
                    <img src={coach.image} alt={coach.name} className="coach-image" />
                    <div className="coach-info-overlay">
                      <div className="coach-info-left">
                        <h3>{coach.name}</h3>
                        <p>{coach.role}</p>
                        <div className="coach-socials">
                          <span onClick={(e) => e.preventDefault()}><FacebookIcon size={16} /></span>
                          <span onClick={(e) => e.preventDefault()}><LinkedinIcon size={16} /></span>
                          <span onClick={(e) => e.preventDefault()}><InstagramIcon size={16} /></span>
                        </div>
                      </div>
                      <div className="coach-link-circle">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta section">
        <div className="container">
          <div className="cta-box-v2">
            <h2 className="h2">Start your personalized coaching journey today</h2>
            <p className="p-large">Expert coaching for growth. We empower leaders and teams to achieve success together.</p>
            <Link to="/programs" className="btn-black-v2" style={{ textDecoration: 'none' }}>
              Start your training
              <div className="icon-circle-lime">
                <ArrowUpRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import './TeamMember.css';

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
import './TeamMember.css';

const TeamMember = () => {
  const { id } = useParams();

  // Mock data for a single coach
  const coach = {
    name: "Giana Herwitz",
    role: "Tennis coach",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80&w=800",
    bio: "With over 10 years of experience in professional tennis coaching, Giana has helped hundreds of athletes refine their technique and improve their game. She specializes in mental toughness and strategic gameplay.",
    specialties: ["Technical refinement", "Mental coaching", "Tournament preparation", "Junior development"],
    experience: "12+ Years",
    location: "Los Angeles, CA",
    socials: { fb: "#", li: "#", ig: "#", mail: "admin@gt-coaching.com" }
  };

  return (
    <div className="team-member-page">
      <div className="container">
        <Link to="/team" className="back-link">
          <ArrowLeft size={20} />
          Back to coaches
        </Link>

        <div className="member-layout">
          <div className="member-image-section">
            <div className="member-image-card">
              <img src={coach.image} alt={coach.name} />
              <div className="member-socials-card">
                <a href={coach.socials.fb}><FacebookIcon /></a>
                <a href={coach.socials.li}><LinkedinIcon /></a>
                <a href={coach.socials.ig}><InstagramIcon /></a>
                <a href={`mailto:${coach.socials.mail}`}><Mail /></a>
              </div>
            </div>
          </div>

          <div className="member-info-section">
            <span className="badge-lime">{coach.role}</span>
            <h1 className="h1">{coach.name}</h1>
            
            <div className="member-stats">
              <div className="stat-item">
                <span className="stat-label">Experience</span>
                <span className="stat-value">{coach.experience}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Location</span>
                <span className="stat-value">{coach.location}</span>
              </div>
            </div>

            <div className="member-bio">
              <h2 className="h3">About me</h2>
              <p>{coach.bio}</p>
            </div>

            <div className="member-specialties">
              <h2 className="h3">Specialties</h2>
              <div className="specialty-tags">
                {coach.specialties.map((s, i) => (
                  <span key={i} className="tag">{s}</span>
                ))}
              </div>
            </div>

            <div className="member-cta">
              <button className="btn-black-v2">
                Book a session with {coach.name.split(' ')[0]}
                <div className="icon-circle-lime">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;

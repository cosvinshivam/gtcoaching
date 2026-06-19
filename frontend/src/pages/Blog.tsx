import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight } from 'lucide-react';
import './Blog.css';
import { ASSETS_URL } from '../config';

const posts = [
  {
    id: "team-communication",
    title: "The importance of team communication in football",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "archery-drills",
    title: "Improve your accuracy with these archery drills",
    date: "August 22, 2023",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "boxing-recovery",
    title: "The importance of recovery in boxing training",
    date: "November 5, 2023",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "golf-mistakes",
    title: "5 common golf mistakes and how to avoid them",
    date: "February 12, 2024",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "water-sports-safety",
    title: "How to stay safe while enjoying water sports",
    date: "May 19, 2024",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "personalized-coaching",
    title: "How personalized coaching leads to faster progress",
    date: "September 1, 2024",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600"
  }
];

const Blog = () => {
  return (
    <div className="blog-v2">
      {/* Hero Section */}
      <section className="blog-hero-v2">
        <div className="container">

          <div className="blog-hero-image-v2">
            <img src={`${ASSETS_URL}/blog-hero.png`} alt="Blog Hero" />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-listing-v2 section">
        <div className="container">
          <div className="blog-grid-v2">
            {posts.map((post, index) => (
              <Link 
                to={`/blog-posts/${post.id}`} 
                key={index} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div 
                  className="blog-card-v2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="blog-thumb-v2">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-info-v2">
                    <div className="post-meta-v2">
                      <Calendar size={14} className="icon-lime" />
                      <span>{post.date}</span>
                    </div>
                    <h3>{post.title}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Site-wide Style) */}
      <section className="blog-cta-section">
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

export default Blog;

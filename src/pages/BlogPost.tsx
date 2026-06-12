import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowUpRight } from 'lucide-react';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();

  // Mock data for a single post
  const post = {
    title: "How to stay safe while enjoying water sports",
    date: "May 19, 2024",
    author: "Michael Thompson",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Water sports offer an incredible way to stay active and enjoy the outdoors, but safety should always be your top priority. Whether you're surfing, kayaking, or swimming, understanding the risks and taking proper precautions can make all the difference.</p>
      
      <h3>1. Always wear a life jacket</h3>
      <p>Even if you're a strong swimmer, unexpected conditions can arise. A high-quality, well-fitting life jacket is essential for any activity involving deep or moving water.</p>
      
      <h3>2. Check the weather forecast</h3>
      <p>Conditions can change rapidly. Before heading out, check the local weather and tide reports. Avoid being on the water during storms or high winds.</p>
      
      <h3>3. Never go alone</h3>
      <p>The buddy system is one of the most effective safety measures. Always have someone with you, or at the very least, let someone on land know where you're going and when you expect to return.</p>
      
      <h3>4. Know your limits</h3>
      <p>Don't push yourself too hard, especially in unfamiliar waters. Listen to your body and return to shore if you feel tired or cold.</p>
    `
  };

  return (
    <div className="blog-post-page">
      {/* Post Hero */}
      <section className="post-hero">
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={20} />
            Back to blog
          </Link>
          <div className="post-header">
            <span className="badge-lime">{post.category}</span>
            <h1 className="h1">{post.title}</h1>
            <div className="post-meta">
              <div className="meta-item">
                <Calendar size={18} className="icon-lime" />
                <span>{post.date}</span>
              </div>
              <div className="meta-item">
                <User size={18} className="icon-lime" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
          <div className="post-main-image">
            <img src={post.image} alt={post.title} />
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="post-body section">
        <div className="container-small">
          <div className="post-content-rich" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          

        </div>
      </section>


    </div>
  );
};

export default BlogPost;

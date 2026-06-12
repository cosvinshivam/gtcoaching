import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqData = {
  "Training and Performance": [
    {
      question: "Do I need prior experience to start coaching?",
      answer: "No prior experience is needed. Our coaches work with athletes of all levels, from beginners to professionals, tailoring programs to your current abilities."
    },
    {
      question: "What sports do you offer coaching for?",
      answer: "We offer specialized coaching for football, basketball, swimming, cycling, athletics, and more. If your sport isn't listed, contact us for a custom consultation."
    },
    {
      question: "Are private 1-on-1 sessions available?",
      answer: "Yes, we offer highly focused private sessions for maximum attention and faster progress."
    }
  ],
  "Pricing and Packages": [
    {
      question: "Are there any setup fees?",
      answer: "No, there are no hidden setup fees. You only pay the listed price for your chosen coaching plan."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    }
  ],
  "Scheduling and Availability": [
    {
      question: "What is your cancellation policy?",
      answer: "We require at least 24 hours' notice for cancellations. Sessions cancelled with less than 24 hours' notice may be charged."
    }
  ]
};

type FAQItemProps = { question: string; answer: string; isOpen: boolean; onClick: () => void };

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className={`faq-item-v1 ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div className="faq-header-v1">
      <h3>{question}</h3>
      <div className="faq-icon-v1">
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="faq-answer-v1"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof faqData>("Training and Performance");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-v1 section">
      <div className="container">
        <div className="faq-layout-v1">
          <div className="faq-sidebar-v1">
            <span className="badge">Knowledge Base</span>
            <h2 className="h2">Common questions</h2>
            <div className="faq-categories-v1">
              {Object.keys(faqData).map((cat) => (
                <button 
                  key={cat}
                  className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat as keyof typeof faqData);
                    setOpenIndex(0);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="faq-list-v1">
            {faqData[activeCategory].map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

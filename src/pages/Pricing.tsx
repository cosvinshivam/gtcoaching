import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    name: "Starter Plan",
    monthlyPrice: 199,
    monthlyWas: 249,
    yearlyPrice: 159,
    yearlyWas: 199,
    features: ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment"]
  },
  {
    name: "Standard Plan",
    monthlyPrice: 299,
    monthlyWas: 349,
    yearlyPrice: 249,
    yearlyWas: 299,
    features: ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis"],
    popular: true
  },
  {
    name: "Premium Plan",
    monthlyPrice: 499,
    monthlyWas: 599,
    yearlyPrice: 399,
    yearlyWas: 499,
    features: ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan"]
  },
  {
    name: "Customize Plan",
    monthlyPrice: "Custom",
    monthlyWas: null,
    yearlyPrice: "Custom",
    yearlyWas: null,
    features: ["Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan", "Dedicated 1-on-1 support"]
  }
];

const featuresList = [
  "Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", 
  "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan", "Dedicated 1-on-1 support"
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pricing-v2">
      {/* Hero Section */}
      <section className="pricing-hero-v2">
        <div className="container">
          <div className="pricing-hero-content-v2">
            
            <div className="toggle-wrapper-v2">
              <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
              <div 
                className={`toggle-switch-v2 ${isYearly ? 'yearly' : ''}`}
                onClick={() => setIsYearly(!isYearly)}
              >
                <div className="switch-knob"></div>
              </div>
              <span className={`toggle-label ${isYearly ? 'active' : ''}`}>Yearly</span>
              {isYearly && <span className="discount-badge">SAVE 20%</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="pricing-plans-v2 section">
        <div className="container plans-grid-v2">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`plan-card-v2 ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="plan-header-v2">
                <h3>{plan.name}</h3>
                <div className="price-tag-v2">
                  {plan.monthlyWas && <span className="was-price">${isYearly ? plan.yearlyWas : plan.monthlyWas}</span>}
                  <div className="current-price-v2">
                    {typeof plan.monthlyPrice === 'number' && <span className="currency">$</span>}
                    <span className={typeof plan.monthlyPrice === 'string' ? "amount string-amount" : "amount"}>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    {typeof plan.monthlyPrice === 'number' && <span className="period">/mo</span>}
                  </div>
                </div>
              </div>

              <div className="plan-features-v2">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="feature-item-v2">
                    <div className="check-box-v2"><Check size={14} /></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className={`plan-btn-v2 ${plan.popular ? 'primary' : 'secondary'}`} style={{ textDecoration: 'none' }}>
                Get started <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section section">
        <div className="container">
          <h2 className="h2 comparison-title">Compare our coaching plans</h2>
          <div className="table-wrapper-v2">
            <table className="comparison-table-v2">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Starter</th>
                  <th>Standard</th>
                  <th>Premium</th>
                  <th>Customize</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feature, i) => (
                  <tr key={i}>
                    <td className="feat-name">{feature}</td>
                    <td>{plans[0].features.includes(feature) ? <Check size={20} className="check-lime" /> : <span className="dash">-</span>}</td>
                    <td>{plans[1].features.includes(feature) ? <Check size={20} className="check-lime" /> : <span className="dash">-</span>}</td>
                    <td>{plans[2].features.includes(feature) ? <Check size={20} className="check-lime" /> : <span className="dash">-</span>}</td>
                    <td>{plans[3].features.includes(feature) ? <Check size={20} className="check-lime" /> : <span className="dash">-</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

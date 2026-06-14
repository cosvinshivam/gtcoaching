import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, Loader } from 'lucide-react';
import axios from 'axios';
import { useSiteContent } from '../context/SiteContentContext';
import { useClientAuth } from '../context/ClientAuthContext';
import './Pricing.css';

const defaultPlans = [
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

const defaultFeaturesList = [
  "Intro session", "Weekly coaching", "Monthly coaching", "Group coaching", 
  "Performance assessment", "Video analysis", "Custom training plan", "Nutrition plan", "Dedicated 1-on-1 support"
];

const Pricing = () => {
  const { getContent } = useSiteContent();
  const { user, token } = useClientAuth();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePurchase = async (plan: any) => {
    if (plan.monthlyPrice === 'Custom') {
      navigate('/contact');
      return;
    }
    
    if (!user || !token) {
      alert("Please log in to purchase a plan.");
      navigate('/login');
      return;
    }

    setLoadingPlan(plan.name);
    try {
      const amount = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
      const res = await axios.post('http://localhost:8000/api/payments/issue-link', {
        amount: amount,
        currency: 'AED',
        description: `GTCoaching - ${plan.name} (${isYearly ? 'Yearly' : 'Monthly'})`,
        plan_name: plan.name
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Redirect to the payment gateway
      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error(err);
      alert("Error initiating payment. Please try again.");
      setLoadingPlan(null);
    }
  };

  let plans = defaultPlans;
  try {
    plans = JSON.parse(getContent('pricing_plans', JSON.stringify(defaultPlans)));
  } catch (e) {
    console.error("Failed to parse pricing plans", e);
  }

  let featuresList = defaultFeaturesList;
  try {
    featuresList = JSON.parse(getContent('pricing_features', JSON.stringify(defaultFeaturesList)));
  } catch (e) {
    console.error("Failed to parse pricing features", e);
  }

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

              <button 
                onClick={() => handlePurchase(plan)}
                className={`plan-btn-v2 ${plan.popular ? 'primary' : 'secondary'}`} 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600 }}
                disabled={loadingPlan === plan.name}
              >
                {loadingPlan === plan.name ? 'Processing...' : (plan.monthlyPrice === 'Custom' ? 'Contact Us' : 'Get started')} 
                {!loadingPlan && <ArrowUpRight size={18} />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section section">
        <div className="container">
          <h2 className="h2 comparison-title">{getContent('pricing_compare_title', 'Compare our coaching plans')}</h2>
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

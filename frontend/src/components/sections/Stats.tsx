import React from 'react';
import './Stats.css';

const stats = [
  { label: 'Athletes Coached', value: '500+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Pro Championships', value: '12' },
  { label: 'Years Experience', value: '15+' },
];

const Stats = () => {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h2 className="h2">{stat.value}</h2>
              <p className="p-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

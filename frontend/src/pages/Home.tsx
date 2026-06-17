import React from 'react';
import Hero from '../components/sections/Hero';
import UnlockPotential from '../components/sections/UnlockPotential';
import ProvenMethods from '../components/sections/ProvenMethods';
import Transformations from '../components/sections/Transformations';
import FAQ from '../components/sections/FAQ';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <UnlockPotential />
      <ProvenMethods />
      <Transformations />
      <FAQ />
    </div>
  );
};

export default Home;

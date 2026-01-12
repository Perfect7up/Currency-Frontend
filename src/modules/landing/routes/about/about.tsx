import React from 'react';
import { AboutCTA, AboutHero, AboutSecurity, AboutStats, AboutValues } from './components';

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-[#000513]">
      <AboutHero />
      <AboutStats />
      <AboutValues />
      <AboutSecurity />
      <AboutCTA />
    </div>
  );
};

export default About;

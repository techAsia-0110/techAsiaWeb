// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import CoreCompetencies from '../components/home/CoreCompetencies';
import LeadingForce from '../components/home/LeadingForce';
import IndustriesServed from '../components/home/IndustriesServed';
import ClientsAndProjects from '../components/home/ClientsAndProjects';
import CTA from '../components/home/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <CoreCompetencies />
      <LeadingForce />
      <IndustriesServed />
      <CTA />
      <ClientsAndProjects />
    </>
  );
};

export default HomePage;
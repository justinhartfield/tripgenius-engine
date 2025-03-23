
import React, { useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { Helmet } from 'react-helmet';

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Create Your Perfect Trip</title>
      </Helmet>
      
      <HeroSection onGetStarted={scrollToForm} />
      
      <div ref={formRef} className="py-8 bg-secondary/10">
        <TravelForm />
      </div>
    </div>
  );
};

export default Index;


import React, { useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={scrollToForm} />
      
      <div ref={formRef} className="py-8">
        <TravelForm />
      </div>
    </div>
  );
};

export default Index;

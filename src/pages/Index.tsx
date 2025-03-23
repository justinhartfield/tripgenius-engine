
import React from 'react';
import { Helmet } from 'react-helmet';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { ExampleItineraries } from '@/components/ExampleItineraries';
import { TravelPreferencesProvider } from '@/contexts/TravelPreferencesContext';
import { NavigationHeader } from '@/components/NavigationHeader';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    // Scroll to the form section
    const formElement = document.querySelector('#travel-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <TravelPreferencesProvider>
      <Helmet>
        <title>Create Your Perfect Travel Itinerary | AI Travel Planner</title>
      </Helmet>
      <NavigationHeader />
      <HeroSection onGetStarted={handleGetStarted} />
      <TravelForm />
      <ExampleItineraries />
    </TravelPreferencesProvider>
  );
};

export default Index;

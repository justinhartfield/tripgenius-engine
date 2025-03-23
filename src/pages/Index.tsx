
import React from 'react';
import { Helmet } from 'react-helmet';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { ExampleItineraries } from '@/components/ExampleItineraries';
import { TravelPreferencesProvider } from '@/contexts/TravelPreferencesContext';
import { NavigationHeader } from '@/components/NavigationHeader';

const Index: React.FC = () => {
  return (
    <TravelPreferencesProvider>
      <Helmet>
        <title>Create Your Perfect Travel Itinerary | AI Travel Planner</title>
      </Helmet>
      <NavigationHeader />
      <HeroSection />
      <TravelForm />
      <ExampleItineraries />
    </TravelPreferencesProvider>
  );
};

export default Index;

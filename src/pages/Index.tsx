
import React from 'react';
import { Helmet } from 'react-helmet';
import { HeroSection } from '@/components/HeroSection';
import { ExampleItineraries } from '@/components/ExampleItineraries';
import { TravelPreferencesProvider } from '@/contexts/TravelPreferencesContext';
import { NavigationHeader } from '@/components/NavigationHeader';
import { useNavigate } from 'react-router-dom';
import { StreamlinedForm } from '@/components/travel-form/StreamlinedForm';

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
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${localStorage.getItem('google_api_key') || ''}&libraries=places`}
          async
          defer
        ></script>
      </Helmet>
      <NavigationHeader />
      <HeroSection onGetStarted={handleGetStarted} />
      
      <section id="travel-form" className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
        <StreamlinedForm />
      </section>
      
      <div className="bg-blue-50 py-12">
        <ExampleItineraries />
      </div>
    </TravelPreferencesProvider>
  );
};

export default Index;

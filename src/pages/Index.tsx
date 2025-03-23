
import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Load Google Maps API dynamically with async attribute
    const loadGoogleMapsApi = () => {
      const googleApiKey = localStorage.getItem('google_api_key') || '';
      if (!googleApiKey) return;
      
      // Check if the API is already loaded
      if (window.google && window.google.maps) return;
      
      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };
    
    loadGoogleMapsApi();
  }, []);

  return (
    <TravelPreferencesProvider>
      <Helmet>
        <title>Create Your Perfect Travel Itinerary | AI Travel Planner</title>
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

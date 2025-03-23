
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { HeroSection } from '@/components/HeroSection';
import { ExampleItineraries } from '@/components/ExampleItineraries';
import { TravelPreferencesProvider } from '@/contexts/TravelPreferencesContext';
import { NavigationHeader } from '@/components/NavigationHeader';
import { useNavigate } from 'react-router-dom';
import { StreamlinedForm } from '@/components/travel-form/StreamlinedForm';
import { toast } from 'sonner';
import { ApiSettingsDialog } from '@/components/ApiSettingsDialog';

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
      // Using a sample key for development - in production, this would come from environment variables or user input
      const googleApiKey = localStorage.getItem('google_api_key') || 'AIzaSyDaeDDzZcrG_e5LKS8fJ-14vESBRIVBq1g';
      
      // Store the key for components to use
      if (googleApiKey && googleApiKey !== 'AIzaSyDaeDDzZcrG_e5LKS8fJ-14vESBRIVBq1g') {
        localStorage.setItem('google_api_key', googleApiKey);
      } else if (!localStorage.getItem('google_api_key')) {
        localStorage.setItem('google_api_key', googleApiKey);
      }
      
      // Check if the API is already loaded
      if (window.google && window.google.maps) return;
      
      try {
        // Create script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Google Maps API loaded successfully');
        };
        script.onerror = () => {
          console.error('Failed to load Google Maps API');
          toast.error('Failed to load Google Maps API. Place autocomplete may not work.');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps API:', error);
      }
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
        <div className="flex justify-end mb-4">
          <ApiSettingsDialog />
        </div>
        <StreamlinedForm />
      </section>
      
      <div className="bg-blue-50 py-12">
        <ExampleItineraries />
      </div>
    </TravelPreferencesProvider>
  );
};

export default Index;

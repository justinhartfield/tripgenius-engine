
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from '@/utils/itinerary';
import { fetchDestinationImage } from '@/utils/googleImageSearch';
import { ItineraryHeader } from '@/components/itinerary/ItineraryHeader';
import { ItineraryLoading } from '@/components/itinerary/ItineraryLoading';
import { ConfigurationWarning } from '@/components/itinerary/ConfigurationWarning';
import { ItineraryNotFound } from '@/components/itinerary/ItineraryNotFound';
import { NavigationHeader } from '@/components/NavigationHeader';

const ItineraryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [destinationImages, setDestinationImages] = useState<Record<string, string>>({});
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [searchEngineId, setSearchEngineId] = useState('');
  const [configurationNeeded, setConfigurationNeeded] = useState(false);
  const [itineraryData, setItineraryData] = useState<GeneratedItineraryContent | null>(null);
  const [preferences, setPreferences] = useState<TravelPreferences | null>(null);
  
  // Load itinerary data either from route state or from localStorage
  useEffect(() => {
    if (location.state?.itineraryData && location.state?.preferences) {
      // Data passed directly through route state (from form)
      setItineraryData(location.state.itineraryData);
      setPreferences(location.state.preferences);
    } else if (slug) {
      // Try to load from localStorage by slug
      try {
        const storedPlansJson = localStorage.getItem('travel_plans');
        if (storedPlansJson) {
          const storedPlans = JSON.parse(storedPlansJson);
          const plan = storedPlans.find((p: any) => p.slug === slug);
          
          if (plan) {
            setItineraryData(plan.itineraryData);
            setPreferences(plan.preferences);
          }
        }
      } catch (error) {
        console.error('Error loading plan from localStorage:', error);
      }
    }
  }, [slug, location.state]);

  useEffect(() => {
    // Load API keys from localStorage
    const storedGoogleApiKey = localStorage.getItem('google_api_key') || '';
    const storedSearchEngineId = localStorage.getItem('google_search_engine_id') || '';
    setGoogleApiKey(storedGoogleApiKey);
    setSearchEngineId(storedSearchEngineId);
    setConfigurationNeeded(!storedGoogleApiKey || !storedSearchEngineId);
  }, []);

  useEffect(() => {
    // Load destination images
    const loadImages = async () => {
      if (!preferences?.destinations.length) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        // Try to load images using Google API if available
        if (googleApiKey && searchEngineId) {
          const imagePromises = preferences.destinations.map(async destination => {
            try {
              const imageUrl = await fetchDestinationImage(destination.name);
              return { name: destination.name, url: imageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${destination.name}:`, error);
              
              // Store the error in localStorage to display in DestinationGallery
              if (error instanceof Error && error.message.includes('Custom Search API is not enabled')) {
                localStorage.setItem('google_api_error', 
                  'The Google Custom Search API is not enabled for your project. Please visit the Google Cloud Console ' +
                  'to enable it for your API key.'
                );
              }
              
              // Use our custom error image
              return { name: destination.name, url: '/lovable-uploads/8c54c5e6-ad02-464b-86cb-e4ec87739e80.png' };
            }
          });

          const images = await Promise.all(imagePromises);
          const imageMap = images.reduce((acc, { name, url }) => {
            if (url) acc[name] = url;
            return acc;
          }, {} as Record<string, string>);

          setDestinationImages(imageMap);
        } else {
          // Empty destination images if no Google API is available to force configuration
          setDestinationImages({});
          setConfigurationNeeded(true);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        setDestinationImages({});
        setConfigurationNeeded(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (preferences) {
      loadImages();
    } else {
      setIsLoading(false);
    }
  }, [preferences, googleApiKey, searchEngineId]);

  const saveApiKeys = () => {
    if (googleApiKey) {
      localStorage.setItem('google_api_key', googleApiKey);
    }
    if (searchEngineId) {
      localStorage.setItem('google_search_engine_id', searchEngineId);
    }
    
    // Clear any stored errors when updating configuration
    localStorage.removeItem('google_api_error');
    
    window.location.reload();
  };

  // Handle case where the page is loaded directly without data
  if (!itineraryData || !preferences) {
    return <ItineraryNotFound />;
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: itineraryData.title,
          text: itineraryData.description,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing itinerary:', error);
    }
  };

  const navigateToPlans = () => {
    navigate('/plans');
  };

  return (
    <>
      <NavigationHeader />
      <div className="container mx-auto py-12 px-4">
        <Helmet>
          <title>{itineraryData.title}</title>
          <meta name="description" content={itineraryData.description} />
          <meta property="og:title" content={itineraryData.title} />
          <meta property="og:description" content={itineraryData.description} />
          {Object.values(destinationImages)[0] && (
            <meta property="og:image" content={Object.values(destinationImages)[0]} />
          )}
        </Helmet>

        <ItineraryHeader 
          googleApiKey={googleApiKey}
          searchEngineId={searchEngineId}
          setGoogleApiKey={setGoogleApiKey}
          setSearchEngineId={setSearchEngineId}
          saveApiKeys={saveApiKeys}
          handleShare={handleShare}
          onBrowsePlans={navigateToPlans}
        />

        {isLoading ? (
          <ItineraryLoading />
        ) : (
          <>
            {configurationNeeded && <ConfigurationWarning />}
            <ItineraryDisplay 
              itinerary={itineraryData.content} 
              travelPreferences={preferences}
              destinationImages={destinationImages}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ItineraryPage;

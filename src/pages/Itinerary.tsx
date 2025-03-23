
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from '@/utils/itineraryUtils';
import { fetchDestinationImage } from '@/utils/googleImageSearch';
import { Link } from 'react-router-dom';

const ItineraryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [destinationImages, setDestinationImages] = useState<Record<string, string>>({});
  
  // Extract state passed from the form
  const { itineraryData, preferences } = location.state || {
    itineraryData: null as GeneratedItineraryContent | null,
    preferences: null as TravelPreferences | null
  };

  useEffect(() => {
    // Load destination images
    const loadImages = async () => {
      if (!preferences?.destinations.length) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const imagePromises = preferences.destinations.map(async destination => {
        try {
          const imageUrl = await fetchDestinationImage(destination.name);
          return { name: destination.name, url: imageUrl };
        } catch (error) {
          console.error(`Error fetching image for ${destination.name}:`, error);
          return { name: destination.name, url: '' };
        }
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, { name, url }) => {
        if (url) acc[name] = url;
        return acc;
      }, {} as Record<string, string>);

      setDestinationImages(imageMap);
      setIsLoading(false);
    };

    loadImages();
  }, [preferences]);

  // Handle case where the page is loaded directly without state
  if (!itineraryData || !preferences) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Planner
          </Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Itinerary Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the itinerary you're looking for. Please return to the trip planner to create a new itinerary.
          </p>
          <Link to="/">
            <Button>Create New Itinerary</Button>
          </Link>
        </div>
      </div>
    );
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

  return (
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

      <div className="flex justify-between items-center mb-8">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Planner
          </Button>
        </Link>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" /> Share Itinerary
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading destination images...</span>
        </div>
      ) : (
        <ItineraryDisplay 
          itinerary={itineraryData.content} 
          travelPreferences={preferences}
          destinationImages={destinationImages}
        />
      )}
    </div>
  );
};

export default ItineraryPage;

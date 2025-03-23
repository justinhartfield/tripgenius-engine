
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Share2, Loader2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from '@/utils/itineraryUtils';
import { fetchDestinationImage } from '@/utils/googleImageSearch';
import { Link } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ItineraryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [destinationImages, setDestinationImages] = useState<Record<string, string>>({});
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [searchEngineId, setSearchEngineId] = useState('');
  const [fallbackImageUsed, setFallbackImageUsed] = useState(false);
  
  // Extract state passed from the form
  const { itineraryData, preferences } = location.state || {
    itineraryData: null as GeneratedItineraryContent | null,
    preferences: null as TravelPreferences | null
  };

  useEffect(() => {
    // Load API keys from localStorage
    const storedGoogleApiKey = localStorage.getItem('google_api_key') || '';
    const storedSearchEngineId = localStorage.getItem('google_search_engine_id') || '';
    setGoogleApiKey(storedGoogleApiKey);
    setSearchEngineId(storedSearchEngineId);
  }, []);

  useEffect(() => {
    // Load destination images
    const loadImages = async () => {
      if (!preferences?.destinations.length) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      // Default fallback images for common destinations
      const fallbackImages: Record<string, string> = {
        'Las Vegas': '/lovable-uploads/8c54c5e6-ad02-464b-86cb-e4ec87739e80.png',
        'New York': 'https://source.unsplash.com/random/?new,york,city',
        'Paris': 'https://source.unsplash.com/random/?paris,eiffel',
        'Tokyo': 'https://source.unsplash.com/random/?tokyo,japan',
        'London': 'https://source.unsplash.com/random/?london,uk',
      };

      try {
        // Try to load images using Google API if available
        if (googleApiKey && searchEngineId) {
          const imagePromises = preferences.destinations.map(async destination => {
            try {
              const imageUrl = await fetchDestinationImage(destination.name);
              return { name: destination.name, url: imageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${destination.name}:`, error);
              // Use fallback image if available, otherwise use Unsplash
              const fallbackUrl = fallbackImages[destination.name] || 
                `https://source.unsplash.com/featured/?${encodeURIComponent(destination.name)},travel,landmark`;
              setFallbackImageUsed(true);
              return { name: destination.name, url: fallbackUrl };
            }
          });

          const images = await Promise.all(imagePromises);
          const imageMap = images.reduce((acc, { name, url }) => {
            if (url) acc[name] = url;
            return acc;
          }, {} as Record<string, string>);

          setDestinationImages(imageMap);
        } else {
          // Use fallback images if no Google API is available
          const fallbackImageMap = preferences.destinations.reduce((acc, destination) => {
            const fallbackUrl = fallbackImages[destination.name] || 
              `https://source.unsplash.com/featured/?${encodeURIComponent(destination.name)},travel,landmark`;
            acc[destination.name] = fallbackUrl;
            return acc;
          }, {} as Record<string, string>);
          
          setDestinationImages(fallbackImageMap);
          setFallbackImageUsed(true);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        // Set fallback images on error
        const fallbackImageMap = preferences.destinations.reduce((acc, destination) => {
          const fallbackUrl = fallbackImages[destination.name] || 
            `https://source.unsplash.com/featured/?${encodeURIComponent(destination.name)},travel,landmark`;
          acc[destination.name] = fallbackUrl;
          return acc;
        }, {} as Record<string, string>);
        
        setDestinationImages(fallbackImageMap);
        setFallbackImageUsed(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [preferences, googleApiKey, searchEngineId]);

  const saveApiKeys = () => {
    if (googleApiKey) {
      localStorage.setItem('google_api_key', googleApiKey);
    }
    if (searchEngineId) {
      localStorage.setItem('google_search_engine_id', searchEngineId);
    }
    window.location.reload();
  };

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
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> API Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>API Settings</DialogTitle>
                <DialogDescription>
                  Configure your API keys for enhanced features
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="google-api-key">Google API Key</Label>
                  <Input
                    id="google-api-key"
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    placeholder="Enter your Google API Key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-engine-id">Google Custom Search Engine ID</Label>
                  <Input
                    id="search-engine-id"
                    value={searchEngineId}
                    onChange={(e) => setSearchEngineId(e.target.value)}
                    placeholder="Enter your Search Engine ID"
                  />
                </div>
                <Button onClick={saveApiKeys}>Save Settings</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share Itinerary
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading destination images...</span>
        </div>
      ) : (
        <>
          {fallbackImageUsed && !googleApiKey && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800 text-sm">
                Using fallback images. For better quality images, configure Google API settings.
              </p>
            </div>
          )}
          <ItineraryDisplay 
            itinerary={itineraryData.content} 
            travelPreferences={preferences}
            destinationImages={destinationImages}
          />
        </>
      )}
    </div>
  );
};

export default ItineraryPage;

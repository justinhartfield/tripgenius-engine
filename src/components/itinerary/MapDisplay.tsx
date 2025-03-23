
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { TravelPreferences } from '@/types';
import { getStoredApiKey } from '@/utils/openaiApi';

interface MapDisplayProps {
  travelPreferences?: TravelPreferences;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ travelPreferences }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  
  useEffect(() => {
    // Try to get Google API key from localStorage
    const apiKey = localStorage.getItem('google_api_key') || '';
    setGoogleApiKey(apiKey);
  }, []);
  
  useEffect(() => {
    if (!travelPreferences?.destinations.length) return;
    
    // Generate a static map URL using destinations
    const destinations = travelPreferences.destinations.map(d => d.name).join('|');
    const encodedDestinations = encodeURIComponent(destinations);
    
    if (googleApiKey) {
      // Use actual Google Maps API with the key
      const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:red|${encodedDestinations}&key=${googleApiKey}`;
      setMapUrl(mapImageUrl);
    } else {
      // Fallback to a placeholder map image when no API key is available
      const fallbackUrl = `https://via.placeholder.com/600x300?text=Map+of+${encodedDestinations}`;
      setMapUrl(fallbackUrl);
    }
  }, [travelPreferences, googleApiKey]);

  if (!mapUrl) return null;

  const handleApiKeyClick = () => {
    const newApiKey = prompt('Enter your Google Maps API Key:');
    if (newApiKey) {
      localStorage.setItem('google_api_key', newApiKey);
      setGoogleApiKey(newApiKey);
    }
  };

  return (
    <div className="relative h-64 overflow-hidden rounded-lg">
      <img 
        src={mapUrl} 
        alt="Map of travel destinations" 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
        <MapPin className="h-5 w-5 text-red-500" />
      </div>
      {!googleApiKey && (
        <div className="absolute top-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center">
          <button 
            onClick={handleApiKeyClick}
            className="underline hover:text-blue-200"
          >
            Set Google Maps API Key
          </button>
        </div>
      )}
    </div>
  );
};

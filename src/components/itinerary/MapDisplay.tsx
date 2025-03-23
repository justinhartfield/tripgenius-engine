
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
  const [mapError, setMapError] = useState(false);
  
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
      setMapError(false);
    } else {
      setMapError(true);
      setMapUrl(null);
    }
  }, [travelPreferences, googleApiKey]);

  const handleApiKeyClick = () => {
    const newApiKey = prompt('Enter your Google Maps API Key:');
    if (newApiKey) {
      localStorage.setItem('google_api_key', newApiKey);
      setGoogleApiKey(newApiKey);
    }
  };

  if (mapError || !mapUrl) {
    return (
      <div className="relative h-64 overflow-hidden rounded-lg bg-gray-100 flex flex-col items-center justify-center">
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Google Maps API key required to display map</p>
        <button 
          onClick={handleApiKeyClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Set Google Maps API Key
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-64 overflow-hidden rounded-lg">
      <img 
        src={mapUrl} 
        alt="Map of travel destinations" 
        className="w-full h-full object-cover"
        onError={() => setMapError(true)}
      />
      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
        <MapPin className="h-5 w-5 text-red-500" />
      </div>
    </div>
  );
};

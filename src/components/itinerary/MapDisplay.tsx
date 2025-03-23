
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { TravelPreferences } from '@/types';

interface MapDisplayProps {
  travelPreferences?: TravelPreferences;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ travelPreferences }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [mapError, setMapError] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    origin: string;
    destination: string;
    travelMode: string;
  } | null>(null);
  
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
      let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:red|${encodedDestinations}&key=${googleApiKey}`;
      
      // If there are multiple destinations, add a path
      if (travelPreferences.destinations.length > 1) {
        const path = travelPreferences.destinations.map(d => encodeURIComponent(d.name)).join('|');
        mapImageUrl += `&path=color:0x0000ff|weight:5|${path}`;
      }
      
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

  const toggleDirections = () => {
    if (travelPreferences?.destinations.length && travelPreferences.destinations.length > 1) {
      setShowDirections(!showDirections);
      if (!showDirections) {
        setRouteInfo({
          origin: travelPreferences.destinations[0].name,
          destination: travelPreferences.destinations[travelPreferences.destinations.length - 1].name,
          travelMode: 'DRIVING'
        });
      } else {
        setRouteInfo(null);
      }
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
    <div className="relative h-auto overflow-hidden rounded-lg">
      {showDirections && routeInfo ? (
        <div className="h-[350px] w-full">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${encodeURIComponent(routeInfo.origin)}&destination=${encodeURIComponent(routeInfo.destination)}&mode=${routeInfo.travelMode.toLowerCase()}`}
          ></iframe>
        </div>
      ) : (
        <img 
          src={mapUrl} 
          alt="Map of travel destinations" 
          className="w-full h-64 object-cover"
          onError={() => setMapError(true)}
        />
      )}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {travelPreferences?.destinations.length && travelPreferences.destinations.length > 1 && (
          <button 
            onClick={toggleDirections}
            className="bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors"
            title={showDirections ? "Show static map" : "Show directions"}
          >
            <Navigation className="h-5 w-5 text-blue-500" />
          </button>
        )}
      </div>
    </div>
  );
};

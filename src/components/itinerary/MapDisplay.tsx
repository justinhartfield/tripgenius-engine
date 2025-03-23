
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { TravelPreferences } from '@/types';

interface MapDisplayProps {
  travelPreferences?: TravelPreferences;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ travelPreferences }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (!travelPreferences?.destinations.length) return;
    
    // Generate a static map URL using destinations
    const destinations = travelPreferences.destinations.map(d => d.name).join('|');
    const encodedDestinations = encodeURIComponent(destinations);
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:red|${encodedDestinations}&key=YOUR_API_KEY`;
    
    // For demo purposes, we'll use a placeholder map image
    setMapUrl('https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=YOUR_API_KEY');
  }, [travelPreferences]);

  if (!mapUrl) return null;

  return (
    <div className="relative h-64 overflow-hidden">
      <img 
        src={mapUrl} 
        alt="Map of travel destinations" 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
        <MapPin className="h-5 w-5 text-red-500" />
      </div>
    </div>
  );
};

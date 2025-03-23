
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Map as MapIcon } from 'lucide-react';
import { TravelPreferences } from '@/types';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface MapDisplayProps {
  travelPreferences?: TravelPreferences;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ travelPreferences }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [mapError, setMapError] = useState(false);
  const [mapView, setMapView] = useState<'static' | 'directions'>('static');
  const mapRef = useRef<HTMLDivElement>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  useEffect(() => {
    // Try to get Google API key from localStorage
    const apiKey = localStorage.getItem('google_api_key') || '';
    setGoogleApiKey(apiKey);
    
    // Initialize Google Maps services if API key is available
    if (apiKey && typeof window.google !== 'undefined' && window.google.maps) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
    }
  }, []);
  
  useEffect(() => {
    if (!travelPreferences?.destinations.length) return;
    
    // Generate a static map URL using destinations
    const destinations = travelPreferences.destinations.map(d => d.name).join('|');
    const encodedDestinations = encodeURIComponent(destinations);
    
    if (googleApiKey) {
      if (mapView === 'static') {
        // Use actual Google Maps API with the key for static map
        const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:red|${encodedDestinations}&key=${googleApiKey}`;
        setMapUrl(mapImageUrl);
        setMapError(false);
      } else if (mapView === 'directions' && travelPreferences.destinations.length > 1) {
        // Initialize interactive map and directions for directions view
        initializeDirectionsMap();
      }
    } else {
      setMapError(true);
      setMapUrl(null);
    }
  }, [travelPreferences, googleApiKey, mapView]);
  
  const initializeDirectionsMap = () => {
    if (!googleApiKey || !travelPreferences?.destinations.length || travelPreferences.destinations.length < 2) return;
    
    // Create map instance if it doesn't exist
    if (!mapInstanceRef.current && mapRef.current && typeof window.google !== 'undefined') {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 4,
        center: { lat: 0, lng: 0 },
      });
      
      // Create directions renderer
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3b82f6',
          strokeWeight: 5,
        }
      });
    }
    
    if (!directionsServiceRef.current || !directionsRendererRef.current || !mapInstanceRef.current) return;
    
    // Calculate directions between destinations
    const destinations = travelPreferences.destinations;
    
    // We need at least two destinations for directions
    if (destinations.length >= 2) {
      const origin = destinations[0].name;
      const destination = destinations[destinations.length - 1].name;
      
      // Create waypoints if there are more than 2 destinations
      const waypoints = destinations.slice(1, -1).map(dest => ({
        location: dest.name,
        stopover: true
      }));
      
      directionsServiceRef.current.route({
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          directionsRendererRef.current?.setDirections(result);
          
          // Center the map based on the route bounds
          const bounds = new window.google.maps.LatLngBounds();
          const route = result.routes[0];
          route.legs.forEach((leg) => {
            leg.steps.forEach((step) => {
              step.path.forEach((point) => {
                bounds.extend(point);
              });
            });
          });
          mapInstanceRef.current?.fitBounds(bounds);
        } else {
          setMapError(true);
        }
      });
    }
  };

  const handleApiKeyClick = () => {
    const newApiKey = prompt('Enter your Google Maps API Key:');
    if (newApiKey) {
      localStorage.setItem('google_api_key', newApiKey);
      setGoogleApiKey(newApiKey);
    }
  };
  
  const handleViewChange = (view: string) => {
    setMapView(view as 'static' | 'directions');
  };

  if (mapError || (!mapUrl && mapView === 'static')) {
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
    <div className="space-y-3">
      {travelPreferences?.destinations && travelPreferences.destinations.length > 1 && (
        <Tabs defaultValue="static" onValueChange={handleViewChange}>
          <TabsList className="w-full">
            <TabsTrigger value="static" className="flex-1">
              <MapIcon className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="directions" className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Routes & Times
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      <div className="relative h-64 overflow-hidden rounded-lg">
        {mapView === 'static' ? (
          <img 
            src={mapUrl || ''} 
            alt="Map of travel destinations" 
            className="w-full h-full object-cover"
            onError={() => setMapError(true)}
          />
        ) : (
          <div ref={mapRef} className="w-full h-full"></div>
        )}
        
        <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
          <MapPin className="h-5 w-5 text-red-500" />
        </div>
      </div>
    </div>
  );
};

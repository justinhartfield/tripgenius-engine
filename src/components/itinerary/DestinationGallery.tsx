
import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface DestinationGalleryProps {
  destinationImages: Record<string, string>;
  destinations?: string[];
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({ 
  destinationImages, 
  destinations = [] 
}) => {
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [searchEngineId, setSearchEngineId] = useState<string>('');
  
  useEffect(() => {
    // Try to get Google API key and search engine ID from localStorage
    const apiKey = localStorage.getItem('google_api_key') || '';
    const engineId = localStorage.getItem('google_search_engine_id') || '';
    setGoogleApiKey(apiKey);
    setSearchEngineId(engineId);
  }, []);

  const handleConfigClick = () => {
    const newApiKey = prompt('Enter your Google API Key:');
    if (newApiKey) {
      localStorage.setItem('google_api_key', newApiKey);
      setGoogleApiKey(newApiKey);
      
      const newEngineId = prompt('Enter your Google Custom Search Engine ID:');
      if (newEngineId) {
        localStorage.setItem('google_search_engine_id', newEngineId);
        setSearchEngineId(newEngineId);
      }
    }
  };
  
  if (Object.keys(destinationImages).length === 0 && destinations.length === 0) return null;
  
  // Show configuration notice if API key or search engine ID is missing
  if (!googleApiKey || !searchEngineId) {
    return (
      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Destination Images</h3>
        <p className="text-sm text-gray-600 mb-4">
          To show beautiful destination images from Google, you need to configure your Google API Key and Custom Search Engine ID.
        </p>
        <button
          onClick={handleConfigClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Configure Google API
        </button>
      </div>
    );
  }

  // Fall back to a default image set if destinationImages has errors
  const hasValidImages = Object.values(destinationImages).some(url => 
    !url.includes('/lovable-uploads/33151d87-d1db-4f5a-ac9c-a6c853db8046.png')
  );

  if (!hasValidImages && Object.keys(destinationImages).length > 0) {
    return (
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <ImageOff className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">Images Unavailable</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          We couldn't load destination images. Your Google API key may not have the Custom Search API enabled 
          or may have reached its quota limit.
        </p>
        <button
          onClick={handleConfigClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Update API Configuration
        </button>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 mb-6">
      {Object.entries(destinationImages).map(([name, url]) => (
        <div key={name} className="flex-shrink-0 w-48 relative">
          <img 
            src={url} 
            alt={name} 
            className="w-full h-32 object-cover rounded-lg shadow-md"
            onError={(e) => {
              // Use our default error image
              e.currentTarget.src = '/lovable-uploads/33151d87-d1db-4f5a-ac9c-a6c853db8046.png';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
            <p className="text-white text-sm font-medium truncate">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

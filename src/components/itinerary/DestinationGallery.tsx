
import React from 'react';
import { ImageOff } from 'lucide-react';
import { isGoogleSearchConfigured } from '@/utils/apiKeys';
import { ApiKeyManager } from '@/components/ApiKeyManager';

interface DestinationGalleryProps {
  destinationImages: Record<string, string>;
  destinations?: string[];
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({ 
  destinationImages, 
  destinations = [] 
}) => {
  if (Object.keys(destinationImages).length === 0 && destinations.length === 0) return null;
  
  // Show configuration notice if API key or search engine ID is missing
  if (!isGoogleSearchConfigured()) {
    return (
      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Destination Images</h3>
        <p className="text-sm text-gray-600 mb-4">
          To show beautiful destination images from Google, you need to configure your Google API Key and Custom Search Engine ID.
        </p>
        <ApiKeyManager />
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
              e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Image+Not+Available';
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

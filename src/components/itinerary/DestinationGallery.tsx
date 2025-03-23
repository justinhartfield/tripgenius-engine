
import React from 'react';

interface DestinationGalleryProps {
  destinationImages: Record<string, string>;
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({ destinationImages }) => {
  if (Object.keys(destinationImages).length === 0) return null;
  
  return (
    <div className="flex overflow-x-auto gap-4 pb-4 mb-6">
      {Object.entries(destinationImages).map(([name, url]) => (
        <div key={name} className="flex-shrink-0 w-48 relative">
          <img 
            src={url} 
            alt={name} 
            className="w-full h-32 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
            <p className="text-white text-sm font-medium truncate">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

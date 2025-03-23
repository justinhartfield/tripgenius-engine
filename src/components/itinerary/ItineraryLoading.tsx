
import React from 'react';
import { Loader2 } from 'lucide-react';

export const ItineraryLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="flex items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-700">Loading your itinerary...</span>
      </div>
      <p className="text-sm text-gray-500 max-w-md text-center">
        We're preparing your travel details. If image loading takes too long, you may need to configure valid Google API keys.
      </p>
    </div>
  );
};

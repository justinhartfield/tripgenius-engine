
import React from 'react';
import { Loader2 } from 'lucide-react';

export const ItineraryLoading: React.FC = () => {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading destination images...</span>
    </div>
  );
};

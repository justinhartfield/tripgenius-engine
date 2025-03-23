
import React from 'react';

interface ItineraryDisplayProps {
  itinerary: string | null;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  if (!itinerary) return null;
  
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Your Personalized Travel Itinerary</h2>
      <div className="prose prose-sm md:prose-base lg:prose-lg mx-auto bg-white rounded-lg shadow-md p-6 markdown-content">
        <div dangerouslySetInnerHTML={{ __html: itinerary.replace(/\n/g, '<br />') }} />
      </div>
    </div>
  );
};

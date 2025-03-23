
import React from 'react';

interface ItineraryContentProps {
  itinerary: string;
  contentRef: React.RefObject<HTMLDivElement>;
}

export const ItineraryContent: React.FC<ItineraryContentProps> = ({ 
  itinerary,
  contentRef
}) => {
  return (
    <div 
      ref={contentRef}
      className="prose prose-sm md:prose-base lg:prose-lg mx-auto bg-white rounded-lg markdown-content" 
      dangerouslySetInnerHTML={{ 
        __html: itinerary.replace(/\n/g, '<br />') 
          // Enhance headers and important sections
          .replace(/## Day \d+/g, match => `<h2 class="text-xl font-bold mt-6 mb-3 text-blue-700 border-b pb-2">${match}</h2>`)
          .replace(/### Morning|### Afternoon|### Evening/g, match => `<h3 class="text-lg font-semibold mt-4 mb-2 text-blue-600">${match}</h3>`)
      }} 
    />
  );
};

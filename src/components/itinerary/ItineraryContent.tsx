
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
          .replace(/## Day \d+/g, match => `<h2 class="text-2xl font-serif text-center uppercase tracking-wide mt-8 mb-4 border-b pb-2">${match.replace('## ', '')}</h2>`)
          .replace(/### Morning|### Afternoon|### Evening/g, match => {
            const icon = match.includes('Morning') 
              ? '☀️' 
              : match.includes('Afternoon') 
                ? '🌤️' 
                : '🌙';
            return `<h3 class="text-lg font-semibold mt-6 mb-3 flex items-center"><span class="mr-2">${icon}</span>${match.replace('### ', '')}</h3>`;
          })
          // Add icons to activities
          .replace(/\*\*(.*?):\*\*/g, '<strong class="text-blue-700">$1:</strong>')
      }} 
    />
  );
};

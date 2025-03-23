
import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { CalendarClock } from 'lucide-react';
import { TravelPreferences } from '@/types';
import { parseItineraryDays } from '@/utils/itineraryUtils';
import { PreviewDay } from './PreviewDay';

interface ItineraryContentProps {
  itinerary: string;
  contentRef: React.RefObject<HTMLDivElement>;
  destinationImages?: Record<string, string>;
  travelPreferences?: TravelPreferences;
}

export const ItineraryContent: React.FC<ItineraryContentProps> = ({ 
  itinerary,
  contentRef,
  destinationImages = {},
  travelPreferences
}) => {
  // Convert the markdown itinerary into structured days data if possible
  const parsedDays = parseItineraryDays(itinerary, travelPreferences);
  
  // Function to convert markdown to HTML with enhanced formatting for sections without our custom UI
  const formatItineraryContent = (content: string): string => {
    // Clean up any raw JSON that might have been returned
    let cleanContent = content;
    if (content.includes('"title":') && content.includes('"description":') && content.includes('"content":')) {
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonContent = JSON.parse(jsonMatch[0]);
          cleanContent = jsonContent.content || content;
        }
      } catch (e) {
        console.warn('Error parsing JSON content, using raw content instead');
      }
    }

    // Convert markdown to HTML using marked
    const html = marked.parse(cleanContent, { async: false }) as string;
    
    // Sanitize HTML to prevent XSS
    const sanitizedHtml = DOMPurify.sanitize(html);

    return sanitizedHtml;
  };

  if (parsedDays.length > 0) {
    return (
      <div ref={contentRef} className="space-y-8 py-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium text-center">Your Day-by-Day Itinerary</h3>
        </div>
        
        {parsedDays.map((day, index) => (
          <PreviewDay 
            key={index} 
            day={day} 
            dayIndex={index} 
            destinationImages={destinationImages}
          />
        ))}
      </div>
    );
  }

  // Fallback to the standard markdown rendering if parsing fails
  return (
    <div 
      ref={contentRef}
      className="prose prose-sm md:prose-base lg:prose-lg mx-auto bg-white rounded-lg markdown-content" 
      dangerouslySetInnerHTML={{ 
        __html: formatItineraryContent(itinerary)
      }} 
    />
  );
};

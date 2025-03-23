
import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface ItineraryContentProps {
  itinerary: string;
  contentRef: React.RefObject<HTMLDivElement>;
}

export const ItineraryContent: React.FC<ItineraryContentProps> = ({ 
  itinerary,
  contentRef
}) => {
  // Function to convert markdown to HTML with enhanced formatting
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
    const html = marked(cleanContent);
    
    // Sanitize HTML to prevent XSS
    const sanitizedHtml = DOMPurify.sanitize(html);

    return sanitizedHtml;
  };

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

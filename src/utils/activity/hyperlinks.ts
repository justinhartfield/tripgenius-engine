
import React from 'react';

/**
 * Adds hyperlinks to venue names in activity text
 * Detects names of hotels, restaurants, places, etc.
 */
export const addHyperlinksToActivityText = (text: string): React.ReactNode => {
  // Split the text into lines to process the title separately
  const lines = text.split('\n');
  
  if (lines.length === 0) return text;
  
  // The first line is usually the title/name of the place
  const titleLine = lines[0];
  const restOfText = lines.slice(1).join('\n');
  
  // Create a hyperlink for the venue name in the title
  const titleWithLink = React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'a',
      {
        href: `https://www.google.com/search?q=${encodeURIComponent(titleLine)}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "font-semibold text-primary hover:underline"
      },
      titleLine
    )
  );
  
  // Process the rest of the text to find potential venue references
  if (!restOfText) return titleWithLink;
  
  // Common venue prefixes that might indicate a place name
  const venuePrefixes = [
    'Hotel', 'Restaurant', 'Café', 'Cafe', 'Museum', 'Park', 'Garden', 
    'Temple', 'Church', 'Castle', 'Palace', 'Bar', 'Pub', 'Club', 'Gallery', 
    'Theater', 'Theatre', 'Beach', 'Mountain', 'Lake', 'River', 'Market', 
    'Shop', 'Mall', 'Center', 'Centre', 'Square', 'Plaza', 'Avenue', 'Street'
  ];
  
  // Function to convert found venue names to links
  const processTextSegment = (segment: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remainingText = segment;
    
    // Look for venue names with common prefixes
    for (const prefix of venuePrefixes) {
      const regex = new RegExp(`(${prefix}\\s[A-Z][\\w\\s'&-]{2,30})`, 'g');
      let match;
      let lastIndex = 0;
      
      while ((match = regex.exec(remainingText)) !== null) {
        const venueName = match[1];
        const beforeVenue = remainingText.substring(lastIndex, match.index);
        
        if (beforeVenue) {
          parts.push(beforeVenue);
        }
        
        parts.push(
          React.createElement(
            'a',
            {
              key: `venue-${match.index}`,
              href: `https://www.google.com/search?q=${encodeURIComponent(venueName)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline"
            },
            venueName
          )
        );
        
        lastIndex = match.index + venueName.length;
      }
      
      if (lastIndex > 0) {
        remainingText = remainingText.substring(lastIndex);
      }
    }
    
    // Add any remaining text
    if (remainingText) {
      parts.push(remainingText);
    }
    
    return parts;
  };
  
  const processedText = processTextSegment(restOfText);
  
  return React.createElement(
    React.Fragment,
    null,
    titleWithLink,
    React.createElement('br', null),
    ...processedText
  );
};

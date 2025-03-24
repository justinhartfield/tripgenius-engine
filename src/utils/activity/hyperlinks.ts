
import React from 'react';

/**
 * Try to generate a direct URL for a location name if possible,
 * otherwise fall back to a Google search
 */
const getLocationUrl = (locationName: string): string => {
  // Clean up the location name for URL construction
  const cleanName = locationName.trim().toLowerCase();
  
  // Check if the location name already contains a valid URL
  if (cleanName.startsWith('http://') || cleanName.startsWith('https://')) {
    return cleanName;
  }
  
  // For known businesses, try to construct a direct URL
  // This is a simple implementation that could be expanded
  if (cleanName.includes('marriott') || cleanName.includes('hilton') || 
      cleanName.includes('hyatt') || 
      cleanName.includes('sheraton')) {
    const brand = cleanName.includes('marriott') ? 'marriott' : 
                 cleanName.includes('hilton') ? 'hilton' : 
                 cleanName.includes('hyatt') ? 'hyatt' : 'sheraton';
    return `https://www.${brand}.com/`;
  }
  
  // If it's a restaurant with a chain name
  if (cleanName.includes('mcdonalds') || cleanName.includes('starbucks') || 
      cleanName.includes('subway') || cleanName.includes('burger king')) {
    const chain = cleanName.includes('mcdonalds') ? 'mcdonalds' : 
                  cleanName.includes('starbucks') ? 'starbucks' : 
                  cleanName.includes('subway') ? 'subway' : 'burgerking';
    return `https://www.${chain}.com/`;
  }
  
  // Default to Google search for all other locations
  return `https://www.google.com/search?q=${encodeURIComponent(locationName)}`;
};

/**
 * Extract business names from text to create targeted hyperlinks
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
    'div',
    { className: "font-semibold text-primary mb-2" },
    titleLine
  );

  // Process the rest of the text to find potential venue references
  if (!restOfText) return titleWithLink;
  
  // Business name patterns
  const businessPatterns = [
    // Common business prefixes followed by names (e.g., "Hotel Ritz", "Restaurant Epicure")
    /\b(Hotel|Restaurant|Café|Cafe|Museum|Theater|Theatre|Gallery|Bar|Pub|Club)\s+([A-Z][a-zA-Z\s'&-]{2,30})\b/g,
    
    // Business names with common suffixes (e.g., "Ritz Hotel", "Louvre Museum")
    /\b([A-Z][a-zA-Z\s'&-]{2,30})\s+(Hotel|Restaurant|Café|Cafe|Museum|Theater|Theatre|Gallery|Bar|Pub|Club)\b/g,
    
    // Well-known chain names
    /\b(Marriott|Hilton|Hyatt|Sheraton|McDonald's|Starbucks|Subway|Burger King)(\s+[A-Za-z\s'&-]{2,30})?\b/g,
    
    // Proper nouns that are likely business names
    /\b(The\s+)?([A-Z][a-zA-Z']+(\s+[A-Z][a-zA-Z']+){1,5})\b(?!\s+(?:Street|Avenue|Road|Boulevard|St\.|Ave\.|Rd\.|Blvd\.))/g
  ];
  
  // Find all business names in the text
  let businessNames: {name: string, index: number}[] = [];
  for (const pattern of businessPatterns) {
    let match;
    pattern.lastIndex = 0;
    
    while ((match = pattern.exec(restOfText)) !== null) {
      businessNames.push({
        name: match[0],
        index: match.index
      });
    }
  }
  
  // Sort business names by their position in the text
  businessNames.sort((a, b) => a.index - b.index);
  
  // Create business name h2 elements with hyperlinks
  const businessNameLinks: React.ReactNode[] = businessNames.map((business, index) => 
    React.createElement(
      'h2',
      { 
        key: `business-name-${index}`,
        className: "text-lg font-medium mt-3 mb-2" 
      },
      React.createElement(
        'a',
        {
          href: getLocationUrl(business.name),
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline"
        },
        business.name
      )
    )
  );
  
  // Add the regular text without business names as hyperlinks
  return React.createElement(
    React.Fragment,
    null,
    titleWithLink,
    businessNameLinks.length > 0 ? businessNameLinks : null,
    React.createElement('div', {className: "text-base mt-3"}, restOfText)
  );
};

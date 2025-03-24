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
    React.createElement(
      'a',
      {
        href: getLocationUrl(titleLine),
        target: "_blank",
        rel: "noopener noreferrer",
        className: "hover:underline"
      },
      titleLine
    )
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
  
  // Create React elements for the rest of the text with business names hyperlinked
  const processedTextParts: React.ReactNode[] = [];
  let currentTextIndex = 0;
  let matchFound = false;
  
  const processedText = restOfText;
  
  // Function to check if a position is within a range already processed
  const isPositionProcessed = (position: number, processedRanges: {start: number, end: number}[]): boolean => {
    return processedRanges.some(range => position >= range.start && position < range.end);
  };
  
  // Keep track of which parts of the text have been processed to avoid overlapping matches
  const processedRanges: {start: number, end: number}[] = [];
  
  // Process the text with each business pattern
  for (const pattern of businessPatterns) {
    let match;
    // Reset the pattern's lastIndex property before each exec call
    pattern.lastIndex = 0;
    
    while ((match = pattern.exec(processedText)) !== null) {
      const businessName = match[0];
      const matchStartIndex = match.index;
      const matchEndIndex = matchStartIndex + businessName.length;
      
      // Skip if this range has already been processed
      if (isPositionProcessed(matchStartIndex, processedRanges)) {
        continue;
      }
      
      // Add text before the match
      if (matchStartIndex > currentTextIndex) {
        processedTextParts.push(processedText.substring(currentTextIndex, matchStartIndex));
      }
      
      // Add the business name as a hyperlink
      processedTextParts.push(
        React.createElement(
          'a',
          {
            key: `business-${matchStartIndex}`,
            href: getLocationUrl(businessName),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:underline"
          },
          businessName
        )
      );
      
      // Update current index and mark this range as processed
      currentTextIndex = matchEndIndex;
      processedRanges.push({start: matchStartIndex, end: matchEndIndex});
      matchFound = true;
    }
  }
  
  // Add any remaining text
  if (currentTextIndex < processedText.length) {
    processedTextParts.push(processedText.substring(currentTextIndex));
  }
  
  // If no business names were found, just return the text as is
  if (!matchFound) {
    processedTextParts.push(processedText);
  }
  
  return React.createElement(
    React.Fragment,
    null,
    titleWithLink,
    React.createElement('div', {className: "text-base"}, ...processedTextParts)
  );
};

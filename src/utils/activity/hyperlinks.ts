
import React from 'react';

/**
 * Try to generate a direct URL for a location name if possible,
 * otherwise fall back to a Google search
 */
const getLocationUrl = (locationName: string): string => {
  // Check if the text already contains a URL
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlMatch = locationName.match(urlRegex);
  
  if (urlMatch && urlMatch.length > 0) {
    return urlMatch[0]; // Return the first URL found
  }
  
  // Clean up the location name for URL construction
  const cleanName = locationName.trim().toLowerCase();
  
  // Check if the location name already contains a valid URL
  if (cleanName.startsWith('http://') || cleanName.startsWith('https://')) {
    return cleanName;
  }
  
  // For known businesses, try to construct a direct URL
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
 * Extract URLs from text
 */
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const urls: string[] = [];
  let match;
  
  while ((match = urlRegex.exec(text)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
};

/**
 * Remove URLs from text
 */
const removeUrls = (text: string): string => {
  return text.replace(/\s*\(https?:\/\/[^\s)]+\)/g, '').replace(/(https?:\/\/[^\s)]+)/g, '');
};

/**
 * Remove bracketed business names
 */
const removeBrackets = (text: string): string => {
  return text.replace(/\[(.*?)\]/g, '$1');
};

/**
 * Extract business names from text
 */
const extractBusinessNames = (text: string): string[] => {
  // Look for business names in square brackets first
  const bracketedBusinessRegex = /\[(.*?)\]/g;
  const businessNames: string[] = [];
  let match;
  
  while ((match = bracketedBusinessRegex.exec(text)) !== null) {
    businessNames.push(match[1]);
  }
  
  // If no bracketed business names, look for other patterns
  if (businessNames.length === 0) {
    // Business name patterns
    const businessPatterns = [
      // Common business prefixes followed by names (e.g., "Hotel Ritz", "Restaurant Epicure")
      /\b(Hotel|Restaurant|Café|Cafe|Museum|Theater|Theatre|Gallery|Bar|Pub|Club)\s+([A-Z][a-zA-Z\s'&-]{2,30})\b/g,
      
      // Business names with common suffixes (e.g., "Ritz Hotel", "Louvre Museum")
      /\b([A-Z][a-zA-Z\s'&-]{2,30})\s+(Hotel|Restaurant|Café|Cafe|Museum|Theater|Theatre|Gallery|Bar|Pub|Club)\b/g,
      
      // Well-known chain names
      /\b(Marriott|Hilton|Hyatt|Sheraton|McDonald's|Starbucks|Subway|Burger King)(\s+[A-Za-z\s'&-]{2,30})?\b/g,
      
      // Proper nouns that are likely business names
      /\b(The\s+)?([A-Z][a-zA-Z']+(\s+[A-Z][a-zA-Z']+){1,5})\b(?!\s+(?:Street|Avenue|Road|Boulevard|St\.|Ave\.|Rd\.|Blvd\.))/g,
      
      // Custom additions for specific business types
      /\b(Bosscat Kitchen|University of California)\b/g
    ];
    
    for (const pattern of businessPatterns) {
      pattern.lastIndex = 0;
      
      while ((match = pattern.exec(text)) !== null) {
        // Extract just the business name from the match
        let businessName = match[0];
        // Add the full match to our business names
        if (!businessNames.includes(businessName)) {
          businessNames.push(businessName);
        }
      }
    }
  }
  
  return businessNames;
};

/**
 * Process text to create hyperlinked business names as h2 elements
 */
export const addHyperlinksToActivityText = (text: string): React.ReactNode => {
  // Split the text into lines to process the title separately
  const lines = text.split('\n');
  
  if (lines.length === 0) return text;
  
  // The first line is usually the title/name of the place
  let titleLine = lines[0];
  const restOfText = lines.slice(1).join('\n');
  
  // Extract and remove URLs from the title
  const urls = extractUrls(titleLine);
  titleLine = removeBrackets(removeUrls(titleLine)).trim();
  
  // Clean description text - remove URLs and bracketed business names
  const cleanedText = removeBrackets(removeUrls(restOfText)).trim();
  
  // Create a title element with the main activity title
  const titleElement = React.createElement(
    'div',
    { className: "font-semibold text-primary mb-2" },
    titleLine
  );
  
  // Extract business names from the title and rest of text
  // First check the title for the main business name
  const titleBusinessNames = extractBusinessNames(titleLine);
  
  // Only use business names from the description if we didn't find any in the title
  const allBusinessNames = titleBusinessNames.length > 0 
    ? titleBusinessNames 
    : extractBusinessNames(cleanedText);
  
  // Create business name elements with hyperlinks (if any were found)
  const businessNameLinks = allBusinessNames.length > 0 
    ? allBusinessNames.map((business, index) => {
        const url = urls.length > 0 ? urls[0] : getLocationUrl(business);
        
        return React.createElement(
          'h2',
          { 
            key: `business-name-${index}`,
            className: "text-lg font-medium text-primary mb-3" 
          },
          React.createElement(
            'a',
            {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:underline"
            },
            business
          )
        );
      })
    : [];
  
  // Only include the first business name to avoid repetition
  const uniqueBusinessLinks = businessNameLinks.length > 0 
    ? [businessNameLinks[0]] 
    : [];
  
  // Add the regular text without business names
  return React.createElement(
    React.Fragment,
    null,
    titleElement,
    uniqueBusinessLinks,
    React.createElement('div', {className: "text-base mt-1"}, cleanedText)
  );
};

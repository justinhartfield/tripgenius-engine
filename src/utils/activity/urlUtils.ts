
/**
 * Extract URLs from text
 */
export const extractUrls = (text: string): string[] => {
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
export const removeUrls = (text: string): string => {
  return text.replace(/\s*\(https?:\/\/[^\s)]+\)/g, '').replace(/(https?:\/\/[^\s)]+)/g, '');
};

/**
 * Try to generate a direct URL for a location name if possible,
 * otherwise fall back to a Google Maps search
 */
export const getLocationUrl = (locationName: string): string => {
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
  
  // Default to Google Maps search for all other locations
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`;
};


/**
 * Remove bracketed business names
 */
export const removeBrackets = (text: string): string => {
  return text.replace(/\[(.*?)\]/g, '$1');
};

/**
 * Extract business names from text
 */
export const extractBusinessNames = (text: string): string[] => {
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
      /\b(Bosscat Kitchen|University of California|The Little Nell|Element 47|Ajax Tavern|Matsuhisa|Remède Spa|White House Tavern|Casa Tua|Jour de Fête)\b/g
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

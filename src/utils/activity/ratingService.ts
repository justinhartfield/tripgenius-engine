
// Interface for business data including ratings
export interface BusinessWithRating {
  name: string;
  url: string;
  rating?: number;
  reviewCount?: number;
}

/**
 * Fetch ratings for a business using Google Places API
 */
export const fetchBusinessRating = async (businessName: string, location: string = ''): Promise<{rating?: number, reviewCount?: number}> => {
  try {
    // This would normally make an API call to Google Places API
    // For demonstration, returning mock data based on business name
    // In production, this should be replaced with actual API calls
    
    // Mock ratings for specific businesses in Aspen
    const mockRatings: Record<string, {rating: number, reviewCount: number}> = {
      'The Little Nell': { rating: 4.8, reviewCount: 512 },
      'Element 47': { rating: 4.7, reviewCount: 278 },
      'Ajax Tavern': { rating: 4.4, reviewCount: 356 },
      'Matsuhisa': { rating: 4.6, reviewCount: 420 },
      'Remède Spa': { rating: 4.9, reviewCount: 189 },
      'White House Tavern': { rating: 4.5, reviewCount: 312 },
      'Casa Tua': { rating: 4.6, reviewCount: 220 },
      'Jour de Fête': { rating: 4.3, reviewCount: 176 },
      'Aspen Art Museum': { rating: 4.4, reviewCount: 301 },
      'Maroon Bells': { rating: 4.9, reviewCount: 732 },
    };
    
    // Return mock data if available, otherwise undefined
    return mockRatings[businessName] || {};
  } catch (error) {
    console.error(`Error fetching rating for ${businessName}:`, error);
    return {};
  }
};

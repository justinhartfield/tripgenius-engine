
/**
 * Fetch destination images using Google Custom Search API
 */
export const fetchDestinationImage = async (destination: string): Promise<string> => {
  try {
    const googleApiKey = localStorage.getItem('google_api_key');
    const searchEngineId = localStorage.getItem('google_search_engine_id');
    
    if (!googleApiKey || !searchEngineId) {
      throw new Error('Missing API keys');
    }
    
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${encodeURIComponent(destination + ' landmark travel')}&searchType=image&num=1&imgSize=large&safe=active`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch image from Google');
    }
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].link;
    } else {
      throw new Error('No image results found');
    }
  } catch (error) {
    console.error('Error fetching destination image:', error);
    // Let the calling component handle the fallback
    throw error;
  }
};

/**
 * Update default fetch destination image function in the openaiApi file
 * to use the Google Custom Search API
 */
export const updateOpenAIApiWithGoogleSearch = () => {
  try {
    // This is just a placeholder function to indicate this functionality is now provided
    // The actual implementation is in the respective components
    console.log('Google Image Search integration is now available');
  } catch (error) {
    console.error('Error updating OpenAI API with Google Search:', error);
  }
};


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
      const data = await response.json();
      console.error('Google API error details:', data);
      
      // Check for specific error types to provide better guidance
      if (data?.error?.code === 403 && data?.error?.status === 'PERMISSION_DENIED') {
        if (data?.error?.message?.includes('API has not been used')) {
          localStorage.setItem('google_api_error', 
            'The Custom Search API has not been enabled in your Google Cloud project. Go to the Google Cloud Console and enable it.'
          );
          throw new Error('The Custom Search API is not enabled in your Google Cloud project');
        } else if (data?.error?.message?.includes('disabled')) {
          localStorage.setItem('google_api_error', 
            'The Custom Search API has been disabled for your project. Go to the Google Cloud Console to enable it.'
          );
          throw new Error('The Custom Search API is disabled for your project');
        } else {
          localStorage.setItem('google_api_error', 
            'Google API access denied. Ensure you have enabled the Custom Search API in your Google Cloud Console.'
          );
          throw new Error(`API access denied: ${data?.error?.message || 'Unknown permission error'}`);
        }
      }
      
      throw new Error(`Google API error: ${response.status} - ${data?.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].link;
    } else {
      throw new Error('No image results found');
    }
  } catch (error) {
    console.error('Error fetching destination image:', error);
    // Return the default error image path instead of throwing
    return '/lovable-uploads/33151d87-d1db-4f5a-ac9c-a6c853db8046.png';
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

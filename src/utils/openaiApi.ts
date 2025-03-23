import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from './itineraryUtils';

export const fetchItinerary = async (
  apiKey: string, 
  preferences: TravelPreferences,
  includeSeoContent: boolean = false
): Promise<string | GeneratedItineraryContent> => {
  try {
    // Check if API key is provided
    if (!apiKey) {
      throw new Error('OpenAI API key is missing');
    }

    // Format selected interests, accommodations, transportation
    const selectedInterests = preferences.interests.filter(item => item.selected).map(item => item.name);
    const selectedAccommodations = preferences.accommodationTypes.filter(item => item.selected).map(item => item.name);
    const selectedTransportations = preferences.transportationTypes.filter(item => item.selected).map(item => item.name);
    
    // Format date range
    const dateInfo = preferences.dateRange.startDate && preferences.dateRange.endDate 
      ? `from ${preferences.dateRange.startDate.toLocaleDateString()} to ${preferences.dateRange.endDate.toLocaleDateString()}`
      : 'flexible dates';

    // Format destinations
    const destinationNames = preferences.destinations.map(dest => dest.name).join(', ');
    
    // Format budget
    const budgetInfo = `${preferences.budget.min}-${preferences.budget.max} ${preferences.budget.currency}`;

    // Construct the prompt
    let prompt = `
    Create a detailed travel itinerary with the following preferences:
    
    Destinations: ${destinationNames || 'Not specified'}
    Dates: ${dateInfo}
    Budget: ${budgetInfo}
    Interests: ${selectedInterests.length > 0 ? selectedInterests.join(', ') : 'Not specified'}
    Accommodation Types: ${selectedAccommodations.length > 0 ? selectedAccommodations.join(', ') : 'Not specified'}
    Transportation Types: ${selectedTransportations.length > 0 ? selectedTransportations.join(', ') : 'Not specified'}
    `;

    if (includeSeoContent) {
      prompt += `
      Please provide your response in JSON format with the following structure:
      {
        "title": "An engaging, SEO-friendly title for this trip (max 60 characters)",
        "description": "A compelling meta description summarizing the trip (max 160 characters)",
        "content": "The detailed day-by-day itinerary formatted in markdown with clear sections for each day"
      }
      
      The title should be catchy and include destination names. The description should highlight key attractions or experiences.
      For the content, provide a day-by-day itinerary with activities, recommended places to visit, dining suggestions, and travel/logistics tips.
      `;
    } else {
      prompt += `
      Please provide a day-by-day itinerary with activities, recommended places to visit, dining suggestions, and travel/logistics tips.
      Format the response in markdown with clear sections for each day.
      `;
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant that creates detailed custom travel itineraries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    if (includeSeoContent) {
      try {
        // Try to parse JSON response
        return JSON.parse(content);
      } catch (e) {
        // If parsing fails, return the content as a string
        console.warn('Failed to parse JSON response from OpenAI, using plain text instead');
        return content;
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    throw error;
  }
};

// Function to check if a stored API key exists
export const getStoredApiKey = (): string => {
  return localStorage.getItem('openai_api_key') || '';
};

// Function to store API key
export const storeApiKey = (apiKey: string): void => {
  localStorage.setItem('openai_api_key', apiKey);
};

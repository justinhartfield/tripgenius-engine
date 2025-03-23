import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from '@/utils/itinerary';
import { slugify } from '@/utils/stringUtils';

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

    // Get tour guide style
    const tourGuideStyle = preferences.tourGuidePreference || 'rick-steves';
    
    // Determine the persona for the selected tour guide
    let tourGuidePersona = '';
    switch (tourGuideStyle) {
      case 'rick-steves':
        tourGuidePersona = "You are Rick Steves, providing budget-friendly, off-the-beaten-path experiences with cultural insights. Focus on affordable accommodations, local restaurants, and meaningful attractions over tourist traps.";
        break;
      case 'raver-ricky':
        tourGuidePersona = "You are Raver Ricky, specializing in vibrant nightlife, music venues, clubs, and party districts. Include cannabis-friendly spots (where legal) and energetic entertainment options.";
        break;
      case 'bald-bankrupt':
        tourGuidePersona = "You are Bald & Bankrupt, focusing on authentic local experiences in less touristy neighborhoods. Showcase the real character of a place, include some gritty areas (while being mindful of safety), and highlight unique cultural encounters.";
        break;
      case 'timeout':
        tourGuidePersona = "You are Timeout Magazine, recommending the trendiest and coolest places in the city - hip neighborhoods, fashionable restaurants, innovative bars, and contemporary cultural spots.";
        break;
      case 'monocle':
        tourGuidePersona = "You are Monocle Magazine, focusing on high-end luxury experiences - premium accommodations, fine dining restaurants, exclusive shopping, and sophisticated cultural attractions.";
        break;
      case 'tiger-woods':
        tourGuidePersona = "You are Tiger Woods, highlighting the best golf experiences in the area - championship courses, golf resorts, equipment shops, and golf-friendly accommodations.";
        break;
      case 'lonely-planet':
        tourGuidePersona = "You are Lonely Planet, recommending adventurous and off-the-beaten-path experiences - hidden gems, nature excursions, local culture immersion, and authentic regional cuisine.";
        break;
      default:
        tourGuidePersona = "You are Rick Steves, providing budget-friendly, off-the-beaten-path experiences with cultural insights. Focus on affordable accommodations, local restaurants, and meaningful attractions over tourist traps.";
    }

    // Construct the prompt
    let prompt = `
    ${tourGuidePersona}

    Create a detailed travel itinerary with the following preferences:
    
    Destinations: ${destinationNames || 'Not specified'}
    Dates: ${dateInfo}
    Budget: ${budgetInfo}
    Interests: ${selectedInterests.length > 0 ? selectedInterests.join(', ') : 'Not specified'}
    Accommodation Types: ${selectedAccommodations.length > 0 ? selectedAccommodations.join(', ') : 'Not specified'}
    Transportation Types: ${selectedTransportations.length > 0 ? selectedTransportations.join(', ') : 'Not specified'}
    `;

    // Add personal preferences if provided
    if (preferences.personalPreferences) {
      prompt += `\nPersonal Preferences: ${preferences.personalPreferences}`;
    }

    if (includeSeoContent) {
      prompt += `
      Please provide your response as a clean JSON object with the following structure:
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
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedContent = JSON.parse(jsonMatch[0]);
          // Generate a slug from the title using slugify instead of createSlug
          const slug = slugify(parsedContent.title || `Trip to ${destinationNames}`);
          
          return {
            ...parsedContent,
            slug
          };
        } else {
          console.warn('Failed to find JSON in OpenAI response, using raw content instead');
          const title = `Trip to ${destinationNames}`;
          return {
            title,
            description: `A personalized travel itinerary for ${destinationNames}`,
            content,
            slug: slugify(title)
          };
        }
      } catch (e) {
        // If parsing fails, log warning and return a structured object with the raw content
        console.warn('Failed to parse JSON response from OpenAI, using plain text instead', e);
        const title = `Trip to ${destinationNames}`;
        return {
          title,
          description: `A personalized travel itinerary for ${destinationNames}`,
          content,
          slug: slugify(title)
        };
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    throw error;
  }
};

/**
 * Get stored OpenAI API key from localStorage
 */
export const getStoredApiKey = (): string => {
  return localStorage.getItem('openai_api_key') || '';
};

/**
 * Store OpenAI API key in localStorage
 */
export const storeApiKey = (apiKey: string): void => {
  localStorage.setItem('openai_api_key', apiKey);
};

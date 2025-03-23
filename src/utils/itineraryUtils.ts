import { TravelPreferences } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { fetchItinerary, getStoredApiKey } from '@/utils/openaiApi';

export interface GeneratedItineraryContent {
  title: string;
  description: string;
  content: string;
  slug: string;
}

export const generateItinerary = async (
  preferences: TravelPreferences,
  openaiApiKey: string,
  onStartGenerating: () => void,
  onFinishGenerating: (result: GeneratedItineraryContent | null, preferences: TravelPreferences) => void
) => {
  if (!openaiApiKey) {
    toast({
      title: "OpenAI API Key Required",
      description: "Please set your OpenAI API key first.",
      variant: "destructive",
    });
    return;
  }
  
  onStartGenerating();
  toast({
    title: "Generating your personalized itinerary",
    description: "Your perfect trip plan is being created. This might take a moment.",
  });
  
  try {
    const itineraryData = await fetchItinerary(openaiApiKey, preferences, true);
    
    // Create a slug from the title
    let slug = '';
    if (typeof itineraryData === 'object' && itineraryData.title) {
      slug = createSlug(itineraryData.title);
    } else {
      // Create a basic slug from destinations if no title is available
      const mainDestination = preferences.destinations[0]?.name || 'travel';
      slug = createSlug(`Trip to ${mainDestination}`);
    }
    
    const result = typeof itineraryData === 'string' 
      ? { 
          title: `Trip to ${preferences.destinations.map(d => d.name).join(', ')}`,
          description: `A personalized ${preferences.dateRange.startDate && preferences.dateRange.endDate ? getDurationText(preferences.dateRange.startDate, preferences.dateRange.endDate) : ''} travel itinerary for ${preferences.destinations.map(d => d.name).join(', ')}.`,
          content: itineraryData,
          slug
        }
      : { ...itineraryData, slug };
    
    onFinishGenerating(result, preferences);
    toast({
      title: "Your itinerary is ready!",
      description: "Explore your personalized travel plan.",
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    toast({
      title: "Error generating itinerary",
      description: error instanceof Error ? error.message : "Please check your API key and try again.",
      variant: "destructive",
    });
    onFinishGenerating(null, preferences);
  }
};

export const validateStep = (
  currentStep: number, 
  travelPreferences: TravelPreferences,
  toast: any
): boolean => {
  if (currentStep === 0 && travelPreferences.destinations.length === 0) {
    toast({
      title: "Please add at least one destination",
      variant: "destructive",
    });
    return false;
  }

  if (currentStep === 1 && (!travelPreferences.dateRange.startDate || !travelPreferences.dateRange.endDate)) {
    toast({
      title: "Please select both start and end dates",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

// Helper function to create SEO-friendly URL slugs
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Remove consecutive hyphens
    .trim();                  // Trim leading/trailing spaces
};

// Helper function to get duration text
const getDurationText = (startDate: Date, endDate: Date): string => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1-day' : `${diffDays}-day`;
};

/**
 * Parse the markdown itinerary content into structured days data
 */
export const parseItineraryDays = (itinerary: string, travelPreferences?: TravelPreferences): { date: Date; activities: { time: string; activity: string; interest: string; }[] }[] => {
  try {
    const days: { date: Date; activities: { time: string; activity: string; interest: string; }[] }[] = [];
    
    // Try to identify day sections in the markdown content
    const dayMatches = itinerary.match(/## Day \d+[\s\S]*?(?=## Day \d+|$)/g);
    
    if (!dayMatches || dayMatches.length === 0) {
      return [];
    }
    
    // Get start date from preferences, or fallback to today
    const startDate = travelPreferences?.dateRange.startDate || new Date();
    
    dayMatches.forEach((dayContent, index) => {
      // Extract day number
      const dayNumberMatch = dayContent.match(/## Day (\d+)/);
      const dayNumber = dayNumberMatch ? parseInt(dayNumberMatch[1]) : index + 1;
      
      // Calculate the date for this day
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + dayNumber - 1);
      
      // Try to extract activities with times
      const activities: { time: string; activity: string; interest: string; }[] = [];
      
      // Look for patterns like "9:00 AM - Breakfast" or "9:00 AM: Breakfast"
      const activityMatches = dayContent.match(/(\d{1,2}:\d{2}(?: [AP]M)?)[:\s-]\s*([^,;]*)/g) || [];
      
      // Parse each activity
      activityMatches.forEach(activityText => {
        const parts = activityText.match(/(\d{1,2}:\d{2}(?: [AP]M)?)[:\s-]\s*(.*)/);
        
        if (parts && parts.length >= 3) {
          const time = parts[1];
          const activity = parts[2].trim();
          
          // Assign an interest category based on keywords
          let interest = 'Sightseeing';
          if (/breakfast|lunch|dinner|café|restaurant|food|eat|dining|meal|bar|coffee|tea/i.test(activity)) {
            interest = 'Food';
          } else if (/museum|gallery|tour|visit|monument|landmark|historical|palace|castle|cathedral|church/i.test(activity)) {
            interest = 'Culture';
          } else if (/hike|trek|swim|surf|adventure|climb|bike|kayak|boat|sail/i.test(activity)) {
            interest = 'Adventure';
          } else if (/spa|massage|relax|beach|pool|rest|nap|sleep|hotel/i.test(activity)) {
            interest = 'Relaxation';
          } else if (/shop|market|mall|store|boutique|buy/i.test(activity)) {
            interest = 'Shopping';
          } else if (/club|pub|party|dance|night|bar|drink/i.test(activity)) {
            interest = 'Nightlife';
          }
          
          activities.push({ time, activity, interest });
        }
      });
      
      // If no activities with times were found but there are bullet points, use those
      if (activities.length === 0) {
        const bulletMatches = dayContent.match(/[-*]\s*([^,;]*)/g) || [];
        
        bulletMatches.forEach((bulletText, idx) => {
          const activity = bulletText.replace(/[-*]\s*/, '').trim();
          
          // Generate a reasonable time based on index
          const hour = 9 + Math.floor(idx / 2);
          const minute = (idx % 2) * 30;
          const time = `${hour}:${minute === 0 ? '00' : minute}`;
          
          // Assign an interest category based on keywords
          let interest = 'Sightseeing';
          if (/breakfast|lunch|dinner|café|restaurant|food|eat|dining|meal|bar|coffee|tea/i.test(activity)) {
            interest = 'Food';
          } else if (/museum|gallery|tour|visit|monument|landmark|historical|palace|castle|cathedral|church/i.test(activity)) {
            interest = 'Culture';
          } else if (/hike|trek|swim|surf|adventure|climb|bike|kayak|boat|sail/i.test(activity)) {
            interest = 'Adventure';
          } else if (/spa|massage|relax|beach|pool|rest|nap|sleep|hotel/i.test(activity)) {
            interest = 'Relaxation';
          } else if (/shop|market|mall|store|boutique|buy/i.test(activity)) {
            interest = 'Shopping';
          } else if (/club|pub|party|dance|night|bar|drink/i.test(activity)) {
            interest = 'Nightlife';
          }
          
          activities.push({ time, activity, interest });
        });
      }
      
      // Add the day to our array if it has activities
      if (activities.length > 0) {
        days.push({ date, activities });
      }
    });
    
    return days;
  } catch (error) {
    console.error('Error parsing itinerary days:', error);
    return [];
  }
};

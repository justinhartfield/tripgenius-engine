
import { TravelPreferences } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { fetchItinerary } from '@/utils/openaiApi';
import { slugify } from '@/utils/stringUtils';

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
    
    // Create a slug from the title using slugify
    let slug = '';
    if (typeof itineraryData === 'object' && itineraryData.title) {
      slug = slugify(itineraryData.title);
    } else {
      // Create a basic slug from destinations if no title is available
      const mainDestination = preferences.destinations[0]?.name || 'travel';
      slug = slugify(`Trip to ${mainDestination}`);
    }
    
    const result = typeof itineraryData === 'string' 
      ? { 
          title: `Trip to ${preferences.destinations.map(d => d.name).join(', ')}`,
          description: `A personalized ${preferences.dateRange.startDate && preferences.dateRange.endDate ? getDurationText(preferences.dateRange.startDate, preferences.dateRange.endDate) : ''} travel itinerary for ${preferences.destinations.map(d => d.name).join(', ')}.`,
          content: itineraryData,
          slug
        }
      : { ...itineraryData, slug };
    
    // Save the itinerary to localStorage for browsing
    saveItineraryToLocalStorage(result, preferences);
    
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

// Save itinerary to localStorage for browsing later
const saveItineraryToLocalStorage = (
  itineraryData: GeneratedItineraryContent, 
  preferences: TravelPreferences
) => {
  try {
    // Get existing plans or initialize new array
    const existingPlansJson = localStorage.getItem('travel_plans');
    const existingPlans = existingPlansJson ? JSON.parse(existingPlansJson) : [];
    
    // Create new plan object
    const newPlan = {
      slug: itineraryData.slug,
      itineraryData,
      preferences,
      createdAt: Date.now()
    };
    
    // Add new plan to array (or replace if same slug exists)
    const planIndex = existingPlans.findIndex((plan: any) => plan.slug === itineraryData.slug);
    if (planIndex >= 0) {
      existingPlans[planIndex] = newPlan;
    } else {
      existingPlans.push(newPlan);
    }
    
    // Save back to localStorage
    localStorage.setItem('travel_plans', JSON.stringify(existingPlans));
  } catch (error) {
    console.error('Error saving itinerary to localStorage:', error);
  }
};

// Helper function to get duration text
export const getDurationText = (startDate: Date, endDate: Date): string => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1-day' : `${diffDays}-day`;
};

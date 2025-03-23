
import { TravelPreferences } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { fetchItinerary, getStoredApiKey } from '@/utils/openaiApi';

export const generateItinerary = async (
  preferences: TravelPreferences,
  openaiApiKey: string,
  onStartGenerating: () => void,
  onFinishGenerating: (result: string | null) => void
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
    const itinerary = await fetchItinerary(openaiApiKey, preferences);
    onFinishGenerating(itinerary);
    toast({
      title: "Your itinerary is ready!",
      description: "Scroll down to view your personalized travel plan.",
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    toast({
      title: "Error generating itinerary",
      description: error instanceof Error ? error.message : "Please check your API key and try again.",
      variant: "destructive",
    });
    onFinishGenerating(null);
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

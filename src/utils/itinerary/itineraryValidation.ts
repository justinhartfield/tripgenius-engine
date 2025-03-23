
import { TravelPreferences } from '@/types';

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

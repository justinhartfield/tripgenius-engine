
import { TravelPreferences } from '@/types';
import { generateDayActivities, calculateTripDuration, SampleDay } from './activityGenerator';

/**
 * Generate a sample itinerary based on user preferences
 */
export const generateSampleItinerary = (preferences: TravelPreferences): SampleDay[] => {
  const { dateRange, interests } = preferences;
  const selectedInterests = interests.filter(interest => interest.selected);
  
  if (!dateRange.startDate || !dateRange.endDate) return [];
  
  const days = calculateTripDuration(dateRange.startDate, dateRange.endDate);
  
  if (days < 1) return [];
  
  const itinerary = [];
  const startDate = dateRange.startDate;
  
  // Generate up to 3 days in the preview
  for (let i = 0; i < Math.min(days, 3); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const activities = generateDayActivities(date, i, selectedInterests);
    
    itinerary.push({
      date,
      activities
    });
  }
  
  return itinerary;
};

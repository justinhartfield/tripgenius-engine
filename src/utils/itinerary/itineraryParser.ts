
import { TravelPreferences } from '@/types';

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
          let interest = determineInterestCategory(activity);
          
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
          let interest = determineInterestCategory(activity);
          
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

// Helper function to determine an interest category based on activity text
function determineInterestCategory(activity: string): string {
  if (/breakfast|lunch|dinner|café|restaurant|food|eat|dining|meal|bar|coffee|tea/i.test(activity)) {
    return 'Food';
  } else if (/museum|gallery|tour|visit|monument|landmark|historical|palace|castle|cathedral|church/i.test(activity)) {
    return 'Culture';
  } else if (/hike|trek|swim|surf|adventure|climb|bike|kayak|boat|sail/i.test(activity)) {
    return 'Adventure';
  } else if (/spa|massage|relax|beach|pool|rest|nap|sleep|hotel/i.test(activity)) {
    return 'Relaxation';
  } else if (/shop|market|mall|store|boutique|buy/i.test(activity)) {
    return 'Shopping';
  } else if (/club|pub|party|dance|night|bar|drink/i.test(activity)) {
    return 'Nightlife';
  }
  
  return 'Sightseeing';
}

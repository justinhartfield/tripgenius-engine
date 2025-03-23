
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
      const activityMatches = dayContent.match(/(\d{1,2}(?::\d{2})?(?: [AP]M)?|Morning|Afternoon|Evening)[:\s-]\s*([^,;]*)/gi) || [];
      
      // Parse each activity
      activityMatches.forEach(activityText => {
        const parts = activityText.match(/(\d{1,2}(?::\d{2})?(?: [AP]M)?|Morning|Afternoon|Evening)[:\s-]\s*(.*)/i);
        
        if (parts && parts.length >= 3) {
          const time = parts[1];
          const activity = parts[2].trim();
          
          // Assign an interest category based on keywords
          let interest = determineInterestCategory(activity);
          
          activities.push({ time, activity, interest });
        }
      });
      
      // If no activities with times were found, try to parse based on sections
      if (activities.length === 0) {
        // Look for Morning/Afternoon/Evening sections
        const sectionMatches = dayContent.match(/\*(Morning|Afternoon|Evening)\*:[\s\S]*?(?=\*(?:Morning|Afternoon|Evening)\*:|$)/gi) || [];
        
        sectionMatches.forEach(sectionText => {
          const sectionMatch = sectionText.match(/\*(Morning|Afternoon|Evening)\*:([\s\S]*?)(?=\*(?:Morning|Afternoon|Evening)\*:|$)/i);
          
          if (sectionMatch && sectionMatch.length >= 3) {
            const timeOfDay = sectionMatch[1];
            const sectionContent = sectionMatch[2];
            
            // Extract activities from this section
            const sectionActivities = sectionContent.match(/[-*]\s*([^,;]*)/g) || [];
            
            sectionActivities.forEach((activityText, idx) => {
              const activity = activityText.replace(/[-*]\s*/, '').trim();
              
              // Skip empty activities
              if (!activity) return;
              
              // Assign an interest category based on keywords
              let interest = determineInterestCategory(activity);
              
              activities.push({ 
                time: timeOfDay, 
                activity, 
                interest 
              });
            });
          }
        });
      }
      
      // If still no activities, try to extract bullet points
      if (activities.length === 0) {
        const bulletMatches = dayContent.match(/[-*]\s*([^,;]*)/g) || [];
        
        bulletMatches.forEach((bulletText, idx) => {
          const activity = bulletText.replace(/[-*]\s*/, '').trim();
          
          // Skip empty activities
          if (!activity) return;
          
          // Generate a reasonable time based on index
          let timeOfDay = 'Morning';
          if (idx >= 3 && idx < 6) {
            timeOfDay = 'Afternoon';
          } else if (idx >= 6) {
            timeOfDay = 'Evening';
          }
          
          // Assign an interest category based on keywords
          let interest = determineInterestCategory(activity);
          
          activities.push({ time: timeOfDay, activity, interest });
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
  const activityLower = activity.toLowerCase();
  
  if (/breakfast|lunch|dinner|café|restaurant|food|eat|dining|meal|bar|coffee|tea|brunch|taste/i.test(activityLower)) {
    return 'Food';
  } else if (/museum|gallery|tour|visit|monument|landmark|historical|palace|castle|cathedral|church/i.test(activityLower)) {
    return 'Culture';
  } else if (/hike|trek|swim|surf|adventure|climb|bike|kayak|boat|sail/i.test(activityLower)) {
    return 'Adventure';
  } else if (/spa|massage|relax|beach|pool|rest|nap|sleep|hotel/i.test(activityLower)) {
    return 'Relaxation';
  } else if (/shop|market|mall|store|boutique|buy/i.test(activityLower)) {
    return 'Shopping';
  } else if (/club|pub|party|dance|night|bar|drink|cannabis|coffee shop|smoke/i.test(activityLower)) {
    return 'Nightlife';
  }
  
  return 'Sightseeing';
}

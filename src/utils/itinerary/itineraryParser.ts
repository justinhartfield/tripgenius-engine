
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
      console.log("No day matches found in the itinerary");
      return [];
    }
    
    console.log(`Found ${dayMatches.length} days in the itinerary`);
    
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
      
      // APPROACH 1: Look for patterns like "9:00 AM - Breakfast" or "9:00 AM: Breakfast"
      const activityMatches = dayContent.match(/(\d{1,2}(?::\d{2})?(?: [AP]M)?|Morning|Afternoon|Evening)[:\s-]\s*([^,;]*)/gi) || [];
      
      // Parse each activity
      activityMatches.forEach(activityText => {
        const parts = activityText.match(/(\d{1,2}(?::\d{2})?(?: [AP]M)?|Morning|Afternoon|Evening)[:\s-]\s*(.*)/i);
        
        if (parts && parts.length >= 3) {
          const time = parts[1].trim();
          const activity = parts[2].trim();
          
          // Assign an interest category based on keywords
          let interest = determineInterestCategory(activity);
          
          activities.push({ time, activity, interest });
        }
      });
      
      // APPROACH 2: If no activities with times were found, try to parse based on sections
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
      
      // APPROACH 3: Try to find sections with "Morning:", "Afternoon:", "Evening:" format
      if (activities.length === 0) {
        const timeOfDaySections = [
          { label: "Morning", regex: /Morning:[\s\S]*?(?=Afternoon:|Evening:|$)/i },
          { label: "Afternoon", regex: /Afternoon:[\s\S]*?(?=Morning:|Evening:|$)/i },
          { label: "Evening", regex: /Evening:[\s\S]*?(?=Morning:|Afternoon:|$)/i }
        ];
        
        timeOfDaySections.forEach(section => {
          const sectionMatch = dayContent.match(section.regex);
          if (sectionMatch && sectionMatch[0]) {
            const sectionContent = sectionMatch[0].replace(`${section.label}:`, '').trim();
            
            // Extract activities from this section (bullet points or separate lines)
            const sectionActivities = sectionContent.match(/[-*]?\s*([^.\n]+)/g) || [];
            
            sectionActivities.forEach(activityText => {
              const activity = activityText.replace(/[-*]\s*/, '').trim();
              
              // Skip empty activities or section headers
              if (!activity || activity === section.label) return;
              
              let interest = determineInterestCategory(activity);
              
              activities.push({ 
                time: section.label, 
                activity, 
                interest 
              });
            });
          }
        });
      }
      
      // APPROACH 4: If still no activities, try to extract bullet points and assign times based on position
      if (activities.length === 0) {
        const bulletMatches = dayContent.match(/[-*]\s*([^,;\n]*)/g) || [];
        
        // Split into morning, afternoon, evening based on position
        const totalBullets = bulletMatches.length;
        let morningCount = Math.floor(totalBullets / 3);
        let afternoonCount = Math.floor(totalBullets / 3);
        let eveningCount = totalBullets - morningCount - afternoonCount;
        
        // Ensure we have at least one activity per time period if possible
        if (morningCount === 0 && totalBullets > 0) morningCount = 1;
        if (afternoonCount === 0 && totalBullets > 1) afternoonCount = 1;
        if (eveningCount === 0 && totalBullets > 2) eveningCount = 1;
        
        bulletMatches.forEach((bulletText, idx) => {
          const activity = bulletText.replace(/[-*]\s*/, '').trim();
          
          // Skip empty activities
          if (!activity) return;
          
          // Generate a reasonable time based on index and our distribution
          let timeOfDay = 'Morning';
          if (idx >= morningCount && idx < morningCount + afternoonCount) {
            timeOfDay = 'Afternoon';
          } else if (idx >= morningCount + afternoonCount) {
            timeOfDay = 'Evening';
          }
          
          // Assign an interest category based on keywords
          let interest = determineInterestCategory(activity);
          
          activities.push({ time: timeOfDay, activity, interest });
        });
      }
      
      // APPROACH 5: If we still have no activities, create default activities
      if (activities.length === 0) {
        // Extract first paragraph as a default activity for the morning
        const firstParagraph = dayContent.replace(/## Day \d+.*?\n+/, '').match(/([^\n]+)/);
        if (firstParagraph && firstParagraph[1]) {
          const activity = firstParagraph[1].trim();
          if (activity) {
            activities.push({
              time: 'Morning',
              activity,
              interest: determineInterestCategory(activity)
            });
          }
        }
        
        // Add default afternoon and evening activities
        activities.push({
          time: 'Afternoon',
          activity: 'Explore the area',
          interest: 'Sightseeing'
        });
        
        activities.push({
          time: 'Evening',
          activity: 'Dinner at local restaurant',
          interest: 'Food'
        });
      }
      
      // Ensure we have at least one activity per time period
      const hasActivity = (timeOfDay: string) => 
        activities.some(a => 
          a.time.toLowerCase().includes(timeOfDay.toLowerCase()) || 
          (timeOfDay === 'Morning' && isTimeInMorning(a.time)) ||
          (timeOfDay === 'Afternoon' && isTimeInAfternoon(a.time)) ||
          (timeOfDay === 'Evening' && isTimeInEvening(a.time))
        );
      
      if (!hasActivity('Morning')) {
        activities.push({
          time: 'Morning',
          activity: 'Breakfast and start exploring',
          interest: 'Food'
        });
      }
      
      if (!hasActivity('Afternoon')) {
        activities.push({
          time: 'Afternoon',
          activity: 'Continue exploring the area',
          interest: 'Sightseeing'
        });
      }
      
      if (!hasActivity('Evening')) {
        activities.push({
          time: 'Evening',
          activity: 'Dinner at local restaurant',
          interest: 'Food'
        });
      }
      
      // Add the day to our array if it has activities
      if (activities.length > 0) {
        console.log(`Day ${dayNumber} has ${activities.length} activities`);
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

// Helper function to check if a time string represents morning hours (5am-11:59am)
function isTimeInMorning(timeStr: string): boolean {
  const hourMatch = timeStr.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    return hour >= 5 && hour < 12;
  }
  
  return false;
}

// Helper function to check if a time string represents afternoon hours (12pm-5:59pm)
function isTimeInAfternoon(timeStr: string): boolean {
  const hourMatch = timeStr.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    return hour >= 12 && hour < 18;
  }
  
  return false;
}

// Helper function to check if a time string represents evening hours (6pm-4:59am)
function isTimeInEvening(timeStr: string): boolean {
  const hourMatch = timeStr.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    return (hour >= 18) || (hour >= 0 && hour < 5);
  }
  
  return false;
}

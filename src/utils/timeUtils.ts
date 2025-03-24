import { Activity } from '@/components/itinerary/types';

// Sort activities within a category by time
export const sortActivitiesByTime = (a: Activity, b: Activity) => {
  const aMatch = a.time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  const bMatch = b.time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (aMatch && bMatch) {
    let aHour = parseInt(aMatch[1]);
    let bHour = parseInt(bMatch[1]);
    
    const aAmPm = aMatch[3]?.toLowerCase();
    const bAmPm = bMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (aAmPm === 'pm' && aHour < 12) aHour += 12;
    if (aAmPm === 'am' && aHour === 12) aHour = 0;
    if (bAmPm === 'pm' && bHour < 12) bHour += 12;
    if (bAmPm === 'am' && bHour === 12) bHour = 0;
    
    if (aHour !== bHour) {
      return aHour - bHour;
    }
    
    // Compare minutes if hours are the same
    const aMinute = aMatch[2] ? parseInt(aMatch[2]) : 0;
    const bMinute = bMatch[2] ? parseInt(bMatch[2]) : 0;
    return aMinute - bMinute;
  }
  
  return 0;
};

// Categorize activities by time of day
export const categorizeActivities = (activities: Activity[]) => {
  const morning: Activity[] = [];
  const afternoon: Activity[] = [];
  const evening: Activity[] = [];

  activities.forEach(activity => {
    const timeStr = activity.time.toLowerCase();
    
    // First check if the time explicitly includes time period keywords
    if (timeStr.includes('morning') || timeStr.includes('breakfast')) {
      morning.push(activity);
      return;
    } else if (timeStr.includes('afternoon') || timeStr.includes('lunch')) {
      afternoon.push(activity);
      return;
    } else if (timeStr.includes('evening') || timeStr.includes('dinner') || timeStr.includes('night')) {
      evening.push(activity);
      return;
    }
    
    // Otherwise parse the time if possible
    const hourMatch = timeStr.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
    
    if (hourMatch) {
      let hour = parseInt(hourMatch[1]);
      const ampm = hourMatch[3]?.toLowerCase();
      
      // Convert to 24-hour format for comparison
      if (ampm === 'pm' && hour < 12) hour += 12;
      if (ampm === 'am' && hour === 12) hour = 0;
      
      // Morning: 5am - 11:59am
      if (hour >= 5 && hour < 12) {
        morning.push(activity);
      }
      // Afternoon: 12pm - 5:59pm
      else if (hour >= 12 && hour < 18) {
        afternoon.push(activity);
      }
      // Evening: 6pm - 4:59am
      else {
        evening.push(activity);
      }
    } else {
      // If the time doesn't contain any recognized format, 
      // use a heuristic to distribute across the day periods
      const index = activities.indexOf(activity);
      const total = activities.length;
      
      if (index < total / 3) {
        morning.push(activity);
      } else if (index < (total * 2) / 3) {
        afternoon.push(activity);
      } else {
        evening.push(activity);
      }
    }
  });

  // Sort activities within each category by time
  morning.sort(sortActivitiesByTime);
  afternoon.sort(sortActivitiesByTime);
  evening.sort(sortActivitiesByTime);

  return { morning, afternoon, evening };
};

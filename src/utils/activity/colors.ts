
/**
 * Determines card and bubble colors based on time of day
 */
export const getTimeOfDayColor = (time: string): string => {
  // Check for time of day keywords first
  const timeStr = time.toLowerCase();
  if (timeStr.includes('morning') || timeStr.includes('breakfast')) {
    return 'bg-orange-100 border-orange-200';
  } else if (timeStr.includes('afternoon') || timeStr.includes('lunch')) {
    return 'bg-green-100 border-green-200';
  } else if (timeStr.includes('evening') || timeStr.includes('dinner') || timeStr.includes('night')) {
    return 'bg-purple-100 border-purple-200';
  }
  
  // Parse the time string to determine if it's morning, afternoon, or evening
  const hourMatch = time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    // Morning: 5am - 11:59am (orange)
    if (hour >= 5 && hour < 12) {
      return 'bg-orange-100 border-orange-200';
    }
    // Afternoon: 12pm - 5:59pm (green)
    else if (hour >= 12 && hour < 18) {
      return 'bg-green-100 border-green-200';
    }
    // Evening: 6pm - 4:59am (purple)
    else {
      return 'bg-purple-100 border-purple-200';
    }
  }
  
  // Default color if time format is not recognized
  return 'bg-gray-100 border-gray-200';
};

/**
 * Returns the tag color based on interest type
 */
export const getTagColor = (interest: string): string => {
  switch (interest.toLowerCase()) {
    case 'food': return 'bg-orange-500/20 text-orange-700';
    case 'sightseeing': return 'bg-blue-500/20 text-blue-700';
    case 'adventure': return 'bg-green-500/20 text-green-700';
    case 'culture': return 'bg-purple-500/20 text-purple-700';
    case 'relaxation': return 'bg-teal-500/20 text-teal-700';
    case 'shopping': return 'bg-pink-500/20 text-pink-700';
    case 'nightlife': return 'bg-indigo-500/20 text-indigo-700';
    default: return 'bg-primary/20 text-primary';
  }
};

/**
 * Get icon background color based on time of day
 */
export const getIconBgColor = (time: string): string => {
  const timeOfDay = getTimeOfDayLabel(time);
  
  switch (timeOfDay) {
    case "Morning": return "bg-orange-200 text-orange-700";
    case "Afternoon": return "bg-green-200 text-green-700";
    case "Evening": return "bg-purple-200 text-purple-700";
    default: return "bg-primary/20 text-primary-foreground";
  }
};

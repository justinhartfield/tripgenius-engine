
/**
 * Format the time for display
 */
export const formatTimeDisplay = (time: string): string => {
  // If it's a standalone number, format it with proper time display
  if (/^\d+$/.test(time.trim())) {
    const hour = parseInt(time.trim());
    return hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
  }
  
  // Check if it's just a word like "Morning", "Afternoon", etc.
  const timeWords = ["morning", "afternoon", "evening", "night", "breakfast", "lunch", "dinner"];
  if (timeWords.some(word => time.toLowerCase() === word)) {
    return time.charAt(0).toUpperCase() + time.slice(1);
  }
  
  return time;
};

/**
 * Determines time of day label
 */
export const getTimeOfDayLabel = (time: string): string => {
  // Check for time of day keywords first
  const timeStr = time.toLowerCase();
  if (timeStr.includes('morning') || timeStr.includes('breakfast')) {
    return "Morning";
  } else if (timeStr.includes('afternoon') || timeStr.includes('lunch')) {
    return "Afternoon";
  } else if (timeStr.includes('evening') || timeStr.includes('dinner') || timeStr.includes('night')) {
    return "Evening";
  }
  
  const hourMatch = time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    if (hour >= 5 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }
  
  // Default to empty string if we can't determine
  return "";
};

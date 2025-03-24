/**
 * Detects the type of activity based on the activity name
 */
export const detectActivityType = (activityName: string): string => {
  const activityNameLower = activityName.toLowerCase();
  
  if (isRestaurantActivity(activityNameLower)) {
    return "dining";
  } else if (isNightlifeActivity(activityNameLower)) {
    return "nightlife";
  } else if (isSightseeingActivity(activityNameLower)) {
    return "sightseeing";
  } else if (isEducationalActivity(activityNameLower)) {
    return "educational";
  }
  
  return "other";
};

/**
 * Check if activity is related to restaurants or dining
 */
export const isRestaurantActivity = (activityName: string): boolean => {
  return activityName.includes('restaurant') || 
         activityName.includes('café') || 
         activityName.includes('cafe') || 
         activityName.includes('food') || 
         activityName.includes('dining') ||
         activityName.includes('kitchen') ||
         activityName.includes('eatery');
};

/**
 * Check if activity is related to nightlife
 */
export const isNightlifeActivity = (activityName: string): boolean => {
  return activityName.includes('bar') || 
         activityName.includes('club') || 
         activityName.includes('pub') || 
         activityName.includes('lounge') || 
         activityName.includes('nightlife') ||
         activityName.includes('party');
};

/**
 * Check if activity is related to sightseeing
 */
export const isSightseeingActivity = (activityName: string): boolean => {
  return activityName.includes('tour') || 
         activityName.includes('museum') || 
         activityName.includes('gallery') || 
         activityName.includes('monument') ||
         activityName.includes('explore') ||
         activityName.includes('visit');
};

/**
 * Check if activity is related to education
 */
export const isEducationalActivity = (activityName: string): boolean => {
  return activityName.includes('university') || 
         activityName.includes('college') || 
         activityName.includes('campus') ||
         activityName.includes('school');
};

/**
 * Extracts the primary business or location name from an activity
 */
export const extractActivityLocation = (activityName: string): string => {
  // First, try to extract business names using the existing function
  const businessNames = extractBusinessNames(activityName);
  
  if (businessNames.length > 0) {
    return businessNames[0];
  }
  
  // If no business names found, get the first line which is typically the title/heading
  const firstLine = activityName.split('\n')[0].trim();
  
  // For 'Visit X' or 'Explore X' patterns, extract X
  const visitMatch = firstLine.match(/^(Visit|Explore|Tour|Check out|Discover)\s+(.+)$/i);
  if (visitMatch && visitMatch[2]) {
    return visitMatch[2];
  }
  
  // Return the first line as fallback
  return firstLine;
};


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

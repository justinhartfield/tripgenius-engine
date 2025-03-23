
import { TravelPreferences } from '@/types';
import { getActivitiesForInterest, getActivityIcon } from '@/utils/previewUtils';

interface Activity {
  time: string;
  activity: string;
  interest: string;
}

export interface SampleDay {
  date: Date;
  activities: Activity[];
}

/**
 * Generate activities for a specific day based on user preferences
 */
export const generateDayActivities = (
  date: Date,
  dayIndex: number,
  selectedInterests: { id: string; name: string; icon: string; selected: boolean }[]
): Activity[] => {
  const activities: Activity[] = [];
  
  // Add morning activity
  const morningInterest = selectedInterests[dayIndex % selectedInterests.length];
  if (morningInterest) {
    const possibleActivities = getActivitiesForInterest(morningInterest.name);
    activities.push({
      time: 'Morning',
      activity: possibleActivities[0],
      interest: morningInterest.name
    });
  } else {
    activities.push({
      time: 'Morning',
      activity: 'Explore the city',
      interest: 'Sightseeing'
    });
  }
  
  // Add afternoon activity
  const afternoonInterest = selectedInterests[(dayIndex + 1) % selectedInterests.length];
  if (afternoonInterest) {
    const possibleActivities = getActivitiesForInterest(afternoonInterest.name);
    activities.push({
      time: 'Afternoon',
      activity: possibleActivities[1],
      interest: afternoonInterest.name
    });
  } else {
    activities.push({
      time: 'Afternoon',
      activity: 'Local cuisine experience',
      interest: 'Food'
    });
  }
  
  // Add evening activity
  const eveningInterest = selectedInterests[(dayIndex + 2) % selectedInterests.length];
  if (eveningInterest) {
    const possibleActivities = getActivitiesForInterest(eveningInterest.name);
    activities.push({
      time: 'Evening',
      activity: possibleActivities[2],
      interest: eveningInterest.name
    });
  } else {
    activities.push({
      time: 'Evening',
      activity: 'Dinner at local restaurant',
      interest: 'Food'
    });
  }
  
  return activities;
};

/**
 * Calculate the number of days in the travel date range
 */
export const calculateTripDuration = (
  startDate: Date | null, 
  endDate: Date | null
): number => {
  if (!startDate || !endDate) return 0;
  
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

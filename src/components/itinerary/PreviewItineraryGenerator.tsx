
import React from 'react';
import { TravelPreferences } from '@/types';
import { getActivitiesForInterest } from '@/utils/previewUtils';

interface SampleDay {
  date: Date;
  activities: {
    time: string;
    activity: string;
    interest: string;
  }[];
}

export const generateSampleItinerary = (preferences: TravelPreferences): SampleDay[] => {
  const { dateRange, interests } = preferences;
  const selectedInterests = interests.filter(interest => interest.selected);
  
  if (!dateRange.startDate || !dateRange.endDate) return [];
  
  const days = Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  if (days < 1) return [];
  
  const itinerary = [];
  const startDate = dateRange.startDate;
  
  for (let i = 0; i < Math.min(days, 3); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const activities = [];
    // Add morning activity
    const morningInterest = selectedInterests[i % selectedInterests.length];
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
    const afternoonInterest = selectedInterests[(i + 1) % selectedInterests.length];
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
        interest: 'Food & Drink'
      });
    }
    
    // Add evening activity
    const eveningInterest = selectedInterests[(i + 2) % selectedInterests.length];
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
        interest: 'Food & Drink'
      });
    }
    
    itinerary.push({
      date,
      activities
    });
  }
  
  return itinerary;
};


import { Interest } from '@/types';

// Sample activities based on selected interests
export const getActivitiesForInterest = (interestName: string) => {
  switch (interestName) {
    case 'Food & Drink': return ['Local cuisine tasting', 'Wine tasting', 'Food markets'];
    case 'Cultural': return ['Museum visits', 'Historical sites', 'Local traditions'];
    case 'Adventure': return ['Hiking', 'Water sports', 'Outdoor activities'];
    case 'Nature': return ['National parks', 'Nature reserves', 'Scenic views'];
    case 'Art': return ['Art galleries', 'Street art tours', 'Local craft shops'];
    case 'Beach': return ['Beach relaxation', 'Coastal walks', 'Water activities'];
    case 'Entertainment': return ['Live shows', 'Local festivals', 'Music venues'];
    case 'Photography': return ['Scenic viewpoints', 'Architecture tours', 'Nature photography'];
    case 'Wine': return ['Wine tasting', 'Vineyard tours', 'Local wineries'];
    default: return ['Sightseeing', 'Local experiences', 'Hidden gems'];
  }
};

export const getActivityIcon = (interest: string) => {
  switch (interest) {
    case 'Food & Drink': return 'Utensils';
    case 'Cultural': return 'Map';
    case 'Adventure': return 'Mountain';
    case 'Nature': return 'TreePine';
    case 'Art': return 'Brush';
    case 'Beach': return 'Waves';
    case 'Entertainment': return 'Ticket';
    case 'Photography': return 'Camera';
    case 'Wine': return 'Wine';
    default: return 'Coffee';
  }
};

export const getRandomTimeSlot = (index: number) => {
  const baseHours = [8, 10, 12, 14, 16, 18, 20];
  const hour = baseHours[index % baseHours.length];
  return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
};

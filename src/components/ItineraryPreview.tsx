
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { BlurredOverlay } from '@/components/ui/BlurredOverlay';
import { TravelPreferences } from '@/types';
import { format } from 'date-fns';
import { Plane, Calendar, Coffee, Utensils, Camera, Map, Bed, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ItineraryPreviewProps {
  preferences: TravelPreferences;
}

export const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({
  preferences,
}) => {
  const { destinations, dateRange, interests } = preferences;
  
  const selectedInterests = interests.filter(interest => interest.selected);
  const mainDestination = destinations.length > 0 ? destinations[0].name : 'your destination';
  
  const days = dateRange.startDate && dateRange.endDate
    ? Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  // Sample activities based on selected interests
  const getActivitiesForInterest = (interestName: string) => {
    switch (interestName) {
      case 'Food & Drink': return ['Local cuisine tasting', 'Wine tasting', 'Food markets'];
      case 'Cultural': return ['Museum visits', 'Historical sites', 'Local traditions'];
      case 'Adventure': return ['Hiking', 'Water sports', 'Outdoor activities'];
      case 'Nature': return ['National parks', 'Nature reserves', 'Scenic views'];
      case 'Art': return ['Art galleries', 'Street art tours', 'Local craft shops'];
      case 'Beach': return ['Beach relaxation', 'Coastal walks', 'Water activities'];
      case 'Entertainment': return ['Live shows', 'Local festivals', 'Music venues'];
      case 'Photography': return ['Scenic viewpoints', 'Architecture tours', 'Nature photography'];
      default: return ['Sightseeing', 'Local experiences', 'Hidden gems'];
    }
  };

  const generateSampleItinerary = () => {
    if (days < 1) return [];
    
    const itinerary = [];
    const startDate = dateRange.startDate;
    
    if (!startDate) return [];
    
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

  const sampleItinerary = generateSampleItinerary();

  const getActivityIcon = (interest: string) => {
    switch (interest) {
      case 'Food & Drink': return <Utensils className="h-4 w-4" />;
      case 'Cultural': return <Map className="h-4 w-4" />;
      case 'Photography': return <Camera className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  if (destinations.length === 0 || !dateRange.startDate || !dateRange.endDate) {
    return null;
  }

  return (
    <AnimatedCard 
      animation="slide" 
      className="max-w-md mx-auto w-full mt-8"
      variant="glass"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">
            Preview of Your Journey
          </h3>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {days} {days === 1 ? 'Day' : 'Days'}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">{destinations.map(d => d.name).join(', ')}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {dateRange.startDate && dateRange.endDate ? (
              `${format(dateRange.startDate, 'MMM d')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`
            ) : (
              'Dates not selected'
            )}
          </span>
        </div>

        <div className="space-y-4 mt-4">
          {sampleItinerary.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-2 animate-fade-in" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
              <h4 className="font-medium text-sm border-b pb-1">
                Day {dayIndex + 1}: {format(day.date, 'EEEE, MMMM d')}
              </h4>
              
              <div className="space-y-3">
                {day.activities.map((activity, actIndex) => (
                  <div 
                    key={actIndex} 
                    className="flex items-start gap-3 p-2 rounded-md bg-secondary/30 animate-scale-in"
                    style={{ animationDelay: `${(dayIndex * 0.1) + (actIndex * 0.05)}s` }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                      {getActivityIcon(activity.interest)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-primary/80">{activity.time}</span>
                        <span className="text-xs text-muted-foreground ml-2">• {activity.interest}</span>
                      </div>
                      <p className="text-sm font-medium mt-0.5">{activity.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {days > 3 && (
            <BlurredOverlay className="py-4 px-6 text-center mt-4">
              <p className="text-sm font-medium">+{days - 3} more days</p>
              <p className="text-xs text-muted-foreground">Complete the form to see your full itinerary</p>
            </BlurredOverlay>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

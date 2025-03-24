
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Sun, Cloud, Moon } from 'lucide-react';
import { categorizeActivities } from '@/utils/timeUtils';
import { ActivityTimeSection } from './ActivityTimeSection';
import { PreviewDayProps } from './types';

export const PreviewDay: React.FC<PreviewDayProps> = ({ 
  day, 
  dayIndex, 
  destinationImages = {},
  tourGuideType = 'rick-steves'
}) => {
  const dayOfMonth = format(day.date, 'd');
  const dayOfWeek = format(day.date, 'EEEE');
  const monthYear = format(day.date, 'MMMM yyyy');
  const monthShort = format(day.date, 'MMM');
  
  // Log the raw activities to help with debugging
  console.log(`Day ${dayIndex + 1} raw activities:`, day.activities);
  
  // Categorize activities by time of day
  const { morning, afternoon, evening } = categorizeActivities(day.activities);
  
  // Log the categorized activities for debugging
  console.log(`Day ${dayIndex + 1} morning activities:`, morning);
  console.log(`Day ${dayIndex + 1} afternoon activities:`, afternoon);
  console.log(`Day ${dayIndex + 1} evening activities:`, evening);
  
  // Pick a random destination image for activity thumbnails if available
  const getRandomThumbnail = () => {
    const images = Object.values(destinationImages);
    if (images.length > 0) {
      return images[Math.floor(Math.random() * images.length)];
    }
    return undefined;
  };
  
  return (
    <div className="space-y-2 animate-fade-in backdrop-blur-sm bg-white/40 rounded-xl p-6 shadow-glass" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="itinerary-day-indicator bg-primary/10 shadow-sm">
          <div>
            <div className="text-sm text-primary font-medium">{monthShort}</div>
            <div className="text-2xl font-bold text-primary leading-tight">{dayOfMonth}</div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-xl">
            Day {dayIndex + 1}: {dayOfWeek}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1.5" />
            {monthYear}
          </div>
        </div>
      </div>
      
      <div className="border-l-2 border-primary/30 pl-[calc(0.75rem+12px)] ml-8 pt-2">
        {/* Morning Activities */}
        <ActivityTimeSection
          activities={morning}
          icon={<Sun className="h-4 w-4 text-orange-500 mr-2" />}
          title="MORNING"
          titleColor="text-orange-600"
          borderColor="border-orange-200"
          dayIndex={dayIndex}
          startIndex={0}
          tourGuideType={tourGuideType}
          thumbnailFn={getRandomThumbnail}
        />
        
        {/* Afternoon Activities */}
        <ActivityTimeSection
          activities={afternoon}
          icon={<Cloud className="h-4 w-4 text-green-500 mr-2" />}
          title="AFTERNOON"
          titleColor="text-green-600"
          borderColor="border-green-200"
          dayIndex={dayIndex}
          startIndex={morning.length}
          tourGuideType={tourGuideType}
          thumbnailFn={getRandomThumbnail}
        />
        
        {/* Evening Activities */}
        <ActivityTimeSection
          activities={evening}
          icon={<Moon className="h-4 w-4 text-purple-500 mr-2" />}
          title="EVENING"
          titleColor="text-purple-600"
          borderColor="border-purple-200"
          dayIndex={dayIndex}
          startIndex={morning.length + afternoon.length}
          tourGuideType={tourGuideType}
          thumbnailFn={getRandomThumbnail}
        />
      </div>
    </div>
  );
};

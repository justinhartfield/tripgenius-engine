
import React from 'react';
import { format } from 'date-fns';
import { PreviewActivity } from './PreviewActivity';
import { getActivityIcon } from '@/utils/previewUtils';
import { Calendar } from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  interest: string;
}

interface PreviewDayProps {
  day: {
    date: Date;
    activities: Activity[];
  };
  dayIndex: number;
  destinationImages?: Record<string, string>;
}

export const PreviewDay: React.FC<PreviewDayProps> = ({ day, dayIndex, destinationImages = {} }) => {
  const dayOfMonth = format(day.date, 'd');
  const dayOfWeek = format(day.date, 'EEEE');
  const monthYear = format(day.date, 'MMMM yyyy');
  
  // Pick a random destination image for activity thumbnails if available
  const getRandomThumbnail = () => {
    const images = Object.values(destinationImages);
    if (images.length > 0) {
      return images[Math.floor(Math.random() * images.length)];
    }
    return undefined;
  };
  
  return (
    <div className="space-y-2 animate-fade-in" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-center flex-shrink-0">
          <div>
            <div className="text-xs text-primary font-medium">{format(day.date, 'MMM')}</div>
            <div className="text-lg font-bold text-primary leading-tight">{dayOfMonth}</div>
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-base">
            Day {dayIndex + 1}: {dayOfWeek}
          </h4>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {monthYear}
          </div>
        </div>
      </div>
      
      <div className="border-l-2 border-primary/20 pl-[calc(0.75rem+12px)] ml-6 pt-2">
        {day.activities.map((activity, actIndex) => (
          <PreviewActivity
            key={actIndex}
            time={activity.time}
            activity={activity.activity}
            interest={activity.interest}
            icon={getActivityIcon(activity.interest)}
            animationDelay={(dayIndex * 0.1) + (actIndex * 0.05)}
            description={`This ${activity.interest.toLowerCase()} activity is perfect for your preferences and fits well with your itinerary.`}
            thumbnail={getRandomThumbnail()}
          />
        ))}
      </div>
    </div>
  );
};


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
  tourGuideType?: string;
}

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
      <div className="flex items-center gap-3 mb-6 pt-6">
        <div className="itinerary-day-indicator">
          <div>
            <div className="text-sm text-primary font-medium">{monthShort}</div>
            <div className="text-2xl font-bold text-primary leading-tight">{dayOfMonth}</div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-xl">
            Day {dayIndex + 1}: {dayOfWeek}
          </h3>
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="h-4 w-4 mr-1.5" />
            {monthYear}
          </div>
        </div>
      </div>
      
      <div className="border-l-2 border-primary/30 pl-[calc(0.75rem+12px)] ml-8 pt-2">
        {day.activities.map((activity, actIndex) => (
          <PreviewActivity
            key={actIndex}
            time={activity.time}
            activity={activity.activity}
            interest={activity.interest}
            icon={getActivityIcon(activity.interest)}
            animationDelay={(dayIndex * 0.1) + (actIndex * 0.05)}
            thumbnail={getRandomThumbnail()}
            tourGuideType={tourGuideType}
          />
        ))}
      </div>
    </div>
  );
};

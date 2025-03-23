import React from 'react';
import { format } from 'date-fns';
import { PreviewActivity } from './PreviewActivity';
import { getActivityIcon } from '@/utils/previewUtils';
import { Calendar, Sun, Cloud, Moon } from 'lucide-react';

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

// Helper function to categorize activities by time of day
const categorizeActivities = (activities: Activity[]) => {
  const morning: Activity[] = [];
  const afternoon: Activity[] = [];
  const evening: Activity[] = [];

  activities.forEach(activity => {
    // First check if the time already includes "Morning", "Afternoon", or "Evening"
    if (activity.time.toLowerCase().includes('morning')) {
      morning.push(activity);
      return;
    } else if (activity.time.toLowerCase().includes('afternoon')) {
      afternoon.push(activity);
      return;
    } else if (activity.time.toLowerCase().includes('evening')) {
      evening.push(activity);
      return;
    }
    
    // Otherwise parse the time if possible
    const hourMatch = activity.time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
    
    if (hourMatch) {
      let hour = parseInt(hourMatch[1]);
      const ampm = hourMatch[3]?.toLowerCase();
      
      // Convert to 24-hour format for comparison
      if (ampm === 'pm' && hour < 12) hour += 12;
      if (ampm === 'am' && hour === 12) hour = 0;
      
      // Morning: 5am - 11:59am
      if (hour >= 5 && hour < 12) {
        morning.push(activity);
      }
      // Afternoon: 12pm - 5:59pm
      else if (hour >= 12 && hour < 18) {
        afternoon.push(activity);
      }
      // Evening: 6pm - 4:59am
      else {
        evening.push(activity);
      }
    } else {
      // If the time contains specific keywords, categorize accordingly
      const timeStr = activity.time.toLowerCase();
      if (timeStr.includes('breakfast') || timeStr.includes('morning')) {
        morning.push(activity);
      } else if (timeStr.includes('lunch') || timeStr.includes('afternoon')) {
        afternoon.push(activity);
      } else if (timeStr.includes('dinner') || timeStr.includes('evening') || timeStr.includes('night')) {
        evening.push(activity);
      } else {
        // Default to morning if we can't determine the time
        morning.push(activity);
      }
    }
  });

  return { morning, afternoon, evening };
};

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
  
  // Categorize activities by time of day
  const { morning, afternoon, evening } = categorizeActivities(day.activities);
  
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
        {morning.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Sun className="h-4 w-4 text-orange-500 mr-2" />
              <h4 className="text-sm font-semibold text-orange-600">MORNING</h4>
            </div>
            <div className="pl-2 border-l-2 border-orange-200">
              {morning.map((activity, actIndex) => (
                <PreviewActivity
                  key={`morning-${actIndex}`}
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
        )}
        
        {/* Afternoon Activities */}
        {afternoon.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Cloud className="h-4 w-4 text-green-500 mr-2" />
              <h4 className="text-sm font-semibold text-green-600">AFTERNOON</h4>
            </div>
            <div className="pl-2 border-l-2 border-green-200">
              {afternoon.map((activity, actIndex) => (
                <PreviewActivity
                  key={`afternoon-${actIndex}`}
                  time={activity.time}
                  activity={activity.activity}
                  interest={activity.interest}
                  icon={getActivityIcon(activity.interest)}
                  animationDelay={(dayIndex * 0.1) + (morning.length * 0.05) + (actIndex * 0.05)}
                  thumbnail={getRandomThumbnail()}
                  tourGuideType={tourGuideType}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Evening Activities */}
        {evening.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <Moon className="h-4 w-4 text-purple-500 mr-2" />
              <h4 className="text-sm font-semibold text-purple-600">EVENING</h4>
            </div>
            <div className="pl-2 border-l-2 border-purple-200">
              {evening.map((activity, actIndex) => (
                <PreviewActivity
                  key={`evening-${actIndex}`}
                  time={activity.time}
                  activity={activity.activity}
                  interest={activity.interest}
                  icon={getActivityIcon(activity.interest)}
                  animationDelay={(dayIndex * 0.1) + (morning.length * 0.05) + (afternoon.length * 0.05) + (actIndex * 0.05)}
                  thumbnail={getRandomThumbnail()}
                  tourGuideType={tourGuideType}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


import React from 'react';
import { format } from 'date-fns';
import { PreviewActivity } from './PreviewActivity';

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
}

export const PreviewDay: React.FC<PreviewDayProps> = ({ day, dayIndex }) => {
  return (
    <div className="space-y-2 animate-fade-in" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
      <h4 className="font-medium text-sm border-b pb-1">
        Day {dayIndex + 1}: {format(day.date, 'EEEE, MMMM d')}
      </h4>
      
      <div className="space-y-3">
        {day.activities.map((activity, actIndex) => (
          <PreviewActivity
            key={actIndex}
            time={activity.time}
            activity={activity.activity}
            interest={activity.interest}
            animationDelay={(dayIndex * 0.1) + (actIndex * 0.05)}
          />
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';
import { TravelPreferences } from '@/types';
import { cn } from '@/lib/utils';

interface ItineraryCalendarPreviewProps {
  title: string;
  destinations: string[];
  startDate: Date;
  days: number;
  interests: string[];
}

export const ItineraryCalendarPreview: React.FC<ItineraryCalendarPreviewProps> = ({
  title,
  destinations,
  startDate,
  days,
  interests
}) => {
  // Generate an array of dates for the trip
  const tripDates = Array.from({ length: days }, (_, i) => {
    const date = addDays(new Date(startDate), i);
    return {
      date,
      dayOfWeek: format(date, 'EEEE'),
      dayOfMonth: format(date, 'd'),
      month: format(date, 'MMM')
    };
  });

  return (
    <div className="bg-white rounded-lg border shadow p-6 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">
          {days} days in {destinations.join(', ')}
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span>
            {format(startDate, 'MMM d')} - {format(addDays(startDate, days - 1), 'MMM d, yyyy')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {tripDates.map((date, index) => (
          <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
            <div className="w-12 flex-shrink-0 text-center">
              <div className="bg-blue-100 rounded-lg p-1">
                <div className="text-xs text-blue-700 font-medium">{date.month}</div>
                <div className="text-lg font-bold text-blue-700">{date.dayOfMonth}</div>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-900">Day {index + 1}: {date.dayOfWeek}</p>
              
              {/* Add some sample activities for each day based on interests */}
              <div className="mt-2 space-y-2">
                {index === 0 && (
                  <>
                    <p className="text-sm text-gray-600">9:00 AM - Arrival and check-in</p>
                    <p className="text-sm text-gray-600">12:00 PM - {interests[0]} exploration</p>
                    <p className="text-sm text-gray-600">7:00 PM - Dinner at local restaurant</p>
                  </>
                )}
                
                {index > 0 && index < days - 1 && (
                  <>
                    <p className="text-sm text-gray-600">
                      10:00 AM - {interests[index % interests.length]} activity
                    </p>
                    <p className="text-sm text-gray-600">
                      2:00 PM - Visit {destinations[0]} highlights
                    </p>
                    <p className="text-sm text-gray-600">
                      6:00 PM - Evening {interests[(index + 1) % interests.length]} experience
                    </p>
                  </>
                )}
                
                {index === days - 1 && (
                  <>
                    <p className="text-sm text-gray-600">10:00 AM - Last-minute shopping</p>
                    <p className="text-sm text-gray-600">1:00 PM - Farewell lunch</p>
                    <p className="text-sm text-gray-600">4:00 PM - Departure</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

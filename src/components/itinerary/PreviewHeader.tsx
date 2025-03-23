
import React from 'react';
import { TravelPreferences } from '@/types';
import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PreviewHeaderProps {
  destinations: string[];
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  days: number;
}

export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  destinations,
  dateRange,
  days,
}) => {
  return (
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
        <span className="font-medium">{destinations.join(', ')}</span>
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
    </div>
  );
};

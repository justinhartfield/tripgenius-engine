
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from '@/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateStepProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

export const DateStep: React.FC<DateStepProps> = ({
  dateRange,
  setDateRange,
}) => {
  const { startDate, endDate } = dateRange;

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!startDate || (startDate && endDate)) {
      // If no start date or both dates set, set start date
      setDateRange({ startDate: date, endDate: null });
    } else {
      // If only start date set and selected date is after, set end date
      if (date < startDate) {
        setDateRange({ startDate: date, endDate: startDate });
      } else {
        setDateRange({ startDate, endDate: date });
      }
    }
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">When are you traveling?</h3>
          <p className="text-muted-foreground text-sm">
            Select your travel dates.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-secondary/60 rounded-md p-3 inline-flex items-center gap-3 mb-4">
            <CalendarIcon className="h-4 w-4 text-primary opacity-70" />
            <span>
              {startDate && endDate
                ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`
                : startDate
                ? `${format(startDate, 'MMM d, yyyy')} - Select end date`
                : 'Select travel dates'}
            </span>
          </div>
        </div>

        <div className={cn("rounded-md overflow-hidden border shadow-sm", "pointer-events-auto")}>
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={handleSelect}
            disabled={(date) => date < new Date()}
            className="pointer-events-auto"
            initialFocus
          />
        </div>

        {startDate && !endDate && (
          <p className="text-sm text-center text-muted-foreground">
            Now select your end date
          </p>
        )}
      </div>
    </AnimatedCard>
  );
};

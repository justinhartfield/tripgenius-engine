
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from '@/types';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateChange: (dateRange: DateRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  dateRange, 
  onDateChange 
}) => {
  const handleCalendarSelect = (range: { from: Date; to: Date }) => {
    if (range.from && range.to) {
      onDateChange({
        startDate: range.from,
        endDate: range.to
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange.startDate && dateRange.endDate ? (
            <span>
              {format(dateRange.startDate, 'PPP')} - {format(dateRange.endDate, 'PPP')}
            </span>
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange.startDate || new Date()}
          selected={{
            from: dateRange.startDate || undefined,
            to: dateRange.endDate || undefined
          }}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              handleCalendarSelect({ from: range.from, to: range.to });
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

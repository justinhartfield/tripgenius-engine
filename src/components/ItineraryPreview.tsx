
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { BlurredOverlay } from '@/components/ui/BlurredOverlay';
import { TravelPreferences } from '@/types';
import { PreviewHeader } from './itinerary/PreviewHeader';
import { PreviewDay } from './itinerary/PreviewDay';
import { generateSampleItinerary } from './itinerary/PreviewItineraryGenerator';

interface ItineraryPreviewProps {
  preferences: TravelPreferences;
}

export const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({
  preferences,
}) => {
  const { destinations, dateRange } = preferences;
  
  const days = dateRange.startDate && dateRange.endDate
    ? Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const sampleItinerary = generateSampleItinerary(preferences);

  if (destinations.length === 0 || !dateRange.startDate || !dateRange.endDate) {
    return null;
  }

  return (
    <AnimatedCard 
      animation="slide" 
      className="max-w-md mx-auto w-full mt-8"
      variant="glass"
    >
      <PreviewHeader
        destinations={destinations.map(d => d.name)}
        dateRange={dateRange}
        days={days}
      />

      <div className="space-y-4 mt-4">
        {sampleItinerary.map((day, dayIndex) => (
          <PreviewDay key={dayIndex} day={day} dayIndex={dayIndex} />
        ))}
        
        {days > 3 && (
          <BlurredOverlay className="py-4 px-6 text-center mt-4">
            <p className="text-sm font-medium">+{days - 3} more days</p>
            <p className="text-xs text-muted-foreground">Complete the form to see your full itinerary</p>
          </BlurredOverlay>
        )}
      </div>
    </AnimatedCard>
  );
};

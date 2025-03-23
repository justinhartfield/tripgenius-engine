
import React, { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TravelPreferences } from '@/types';
import { MapDisplay } from './itinerary/MapDisplay';
import { DestinationGallery } from './itinerary/DestinationGallery';
import { ItineraryContent } from './itinerary/ItineraryContent';
import { CalendarExport } from './itinerary/CalendarExport';

interface ItineraryDisplayProps {
  itinerary: string | null;
  travelPreferences?: TravelPreferences;
  destinationImages?: Record<string, string>;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ 
  itinerary, 
  travelPreferences,
  destinationImages = {}
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  if (!itinerary) return null;
  
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-center text-2xl font-bold">Your Personalized Travel Itinerary</CardTitle>
        </CardHeader>
        
        <MapDisplay travelPreferences={travelPreferences} />
        
        <CardContent className="p-6">
          <DestinationGallery destinationImages={destinationImages} />
          <ItineraryContent itinerary={itinerary} contentRef={contentRef} />
        </CardContent>
        
        <CardFooter>
          <CalendarExport 
            travelPreferences={travelPreferences} 
            itinerary={itinerary} 
            contentRef={contentRef}
            destinationImages={destinationImages}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

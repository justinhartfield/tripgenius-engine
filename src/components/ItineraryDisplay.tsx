
import React, { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TravelPreferences } from '@/types';
import { MapDisplay } from './itinerary/MapDisplay';
import { DestinationGallery } from './itinerary/DestinationGallery';
import { ItineraryContent } from './itinerary/ItineraryContent';
import { CalendarExport } from './itinerary/CalendarExport';
import { format } from 'date-fns';

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
  
  // Get main destination (first one) for the title
  const mainDestination = travelPreferences?.destinations[0]?.name || 'Your Destination';
  const dateRangeText = travelPreferences?.dateRange.startDate && travelPreferences?.dateRange.endDate
    ? `${format(travelPreferences.dateRange.startDate, 'MMMM d')} - ${format(travelPreferences.dateRange.endDate, 'MMMM d, yyyy')}`
    : 'Your Travel Dates';
  
  // Use the first destination image as the header background, or fallback
  const headerImage = Object.values(destinationImages)[0] || '/lovable-uploads/8c54c5e6-ad02-464b-86cb-e4ec87739e80.png';
  
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-blue-600 text-white relative overflow-hidden p-0">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={headerImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
          </div>
          <div className="relative z-10 text-center py-12 px-4">
            <h2 className="text-5xl font-serif mb-2">{mainDestination.toUpperCase()}</h2>
            <p className="text-xl font-light">{dateRangeText}</p>
            <div className="mt-4">
              <h3 className="text-2xl font-serif">Travel Itinerary</h3>
              <p className="text-sm opacity-80">COMPLETE GUIDE</p>
            </div>
          </div>
        </CardHeader>
        
        <MapDisplay travelPreferences={travelPreferences} />
        
        <CardContent className="p-6">
          <div className="border-b pb-4 mb-6">
            <h3 className="text-xl font-serif text-center uppercase tracking-wide mb-2">TRIP OVERVIEW</h3>
            <p className="text-center text-gray-600">
              Your journey through {travelPreferences?.destinations.map(d => d.name).join(', ')}
            </p>
          </div>
          
          {Object.keys(destinationImages).length > 0 && (
            <DestinationGallery 
              destinationImages={destinationImages} 
              destinations={travelPreferences?.destinations.map(d => d.name)}
            />
          )}
          
          <div className="border-b pb-4 mb-6">
            <h3 className="text-xl font-serif text-center uppercase tracking-wide mb-2">DAILY SCHEDULE</h3>
          </div>
          
          <ItineraryContent itinerary={itinerary} contentRef={contentRef} />
        </CardContent>
        
        <CardFooter className="border-t pt-4 bg-gray-50">
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

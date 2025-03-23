
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, MapPin, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { TravelPreferences } from '@/types';

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
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!travelPreferences?.destinations.length) return;
    
    // Generate a static map URL using destinations
    const destinations = travelPreferences.destinations.map(d => d.name).join('|');
    const encodedDestinations = encodeURIComponent(destinations);
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:red|${encodedDestinations}&key=YOUR_API_KEY`;
    
    // For demo purposes, we'll use a placeholder map image
    setMapUrl('https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=YOUR_API_KEY');
  }, [travelPreferences]);
  
  if (!itinerary) return null;
  
  const exportToGoogleCalendar = () => {
    // This is a simplified example - in a real app you would parse the itinerary and create proper calendar events
    const destination = travelPreferences?.destinations[0]?.name || 'Travel Destination';
    const startDate = travelPreferences?.dateRange.startDate?.toISOString().split('T')[0] || '';
    const endDate = travelPreferences?.dateRange.endDate?.toISOString().split('T')[0] || '';
    
    if (!startDate || !endDate) {
      toast({
        title: "Date information missing",
        description: "Please make sure your travel dates are set",
        variant: "destructive"
      });
      return;
    }
    
    const text = `Travel to ${destination}`;
    const dates = `${startDate}/${endDate}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${dates.replace(/-/g, '')}&details=${encodeURIComponent('Itinerary details')}`;
    
    window.open(url, '_blank');
    
    toast({
      title: "Opening Google Calendar",
      description: "A new tab has opened to add this to your Google Calendar."
    });
  };
  
  const exportToAppleCalendar = () => {
    // Generate an ics file for download
    const destination = travelPreferences?.destinations[0]?.name || 'Travel Destination';
    const startDate = travelPreferences?.dateRange.startDate?.toISOString() || '';
    const endDate = travelPreferences?.dateRange.endDate?.toISOString() || '';
    
    if (!startDate || !endDate) {
      toast({
        title: "Date information missing",
        description: "Please make sure your travel dates are set",
        variant: "destructive"
      });
      return;
    }
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Travel to ${destination}`,
      `DTSTART:${startDate.replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.replace(/[-:]/g, '').split('.')[0]}Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${destination}_Itinerary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Calendar file downloaded",
      description: "Import this file into Apple Calendar or other calendar apps."
    });
  };
  
  const printItinerary = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Could not open print window",
        description: "Please allow pop-ups for this website",
        variant: "destructive"
      });
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Travel Itinerary</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          h1 { color: #2563eb; }
          h2 { color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
          .container { max-width: 800px; margin: 0 auto; }
          .destination-image { width: 100%; max-width: 300px; height: auto; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Travel Itinerary</h1>
          ${Object.entries(destinationImages).length > 0 ? 
            `<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
              ${Object.entries(destinationImages).map(([name, url]) => 
                `<div>
                  <img src="${url}" alt="${name}" class="destination-image" />
                  <p>${name}</p>
                </div>`
              ).join('')}
            </div>` : ''
          }
          ${contentRef.current?.innerHTML || itinerary.replace(/\n/g, '<br />')}
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
  
  // Create a gallery of destination images
  const renderDestinationGallery = () => {
    if (Object.keys(destinationImages).length === 0) return null;
    
    return (
      <div className="flex overflow-x-auto gap-4 pb-4 mb-6">
        {Object.entries(destinationImages).map(([name, url]) => (
          <div key={name} className="flex-shrink-0 w-48 relative">
            <img 
              src={url} 
              alt={name} 
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
              <p className="text-white text-sm font-medium truncate">{name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-center text-2xl font-bold">Your Personalized Travel Itinerary</CardTitle>
        </CardHeader>
        
        {mapUrl && (
          <div className="relative h-64 overflow-hidden">
            <img 
              src={mapUrl} 
              alt="Map of travel destinations" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
              <MapPin className="h-5 w-5 text-red-500" />
            </div>
          </div>
        )}
        
        <CardContent className="p-6">
          {renderDestinationGallery()}
          
          <div 
            ref={contentRef}
            className="prose prose-sm md:prose-base lg:prose-lg mx-auto bg-white rounded-lg markdown-content" 
            dangerouslySetInnerHTML={{ 
              __html: itinerary.replace(/\n/g, '<br />') 
                // Enhance headers and important sections
                .replace(/## Day \d+/g, match => `<h2 class="text-xl font-bold mt-6 mb-3 text-blue-700 border-b pb-2">${match}</h2>`)
                .replace(/### Morning|### Afternoon|### Evening/g, match => `<h3 class="text-lg font-semibold mt-4 mb-2 text-blue-600">${match}</h3>`)
            }} 
          />
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-2 justify-center p-6 bg-slate-50">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={exportToGoogleCalendar}
          >
            <Calendar className="h-4 w-4" />
            <span>Google Calendar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={exportToAppleCalendar}
          >
            <Calendar className="h-4 w-4" />
            <span>Apple Calendar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={printItinerary}
          >
            <Download className="h-4 w-4" />
            <span>Print/Save PDF</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => {
              navigator.clipboard.writeText(itinerary);
              toast({
                title: "Itinerary copied!",
                description: "The itinerary has been copied to your clipboard."
              });
            }}
          >
            <Share2 className="h-4 w-4" />
            <span>Copy Text</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

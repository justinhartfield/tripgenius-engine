
import React from 'react';
import { Calendar, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { TravelPreferences } from '@/types';

interface CalendarExportProps {
  travelPreferences?: TravelPreferences;
  itinerary: string;
  contentRef: React.RefObject<HTMLDivElement>;
  destinationImages?: Record<string, string>;
}

export const CalendarExport: React.FC<CalendarExportProps> = ({ 
  travelPreferences, 
  itinerary,
  contentRef,
  destinationImages = {}
}) => {
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

  return (
    <div className="flex flex-wrap gap-2 justify-center p-6 bg-slate-50">
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
    </div>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleItem {
  date: string;
  event: string;
}

interface Itinerary {
  id: number;
  name: string;
  schedule: ScheduleItem[];
}

interface ItinerarySelectorProps {
  itineraries: Itinerary[];
  selectedItinerary?: number;
  onSelect?: (id: number) => void;
}

export const ItinerarySelector: React.FC<ItinerarySelectorProps> = ({
  itineraries,
  selectedItinerary,
  onSelect = () => {},
}) => {
  const [selected, setSelected] = useState<number>(selectedItinerary || (itineraries[0]?.id || 0));
  
  const handleSelect = (id: number) => {
    setSelected(id);
    onSelect(id);
  };
  
  const selectedItineraryData = itineraries.find(item => item.id === selected);
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-3">Choose Your Itinerary</h2>
        <p className="text-muted-foreground mb-6">
          Select from our recommended itineraries or browse to find the perfect fit for your journey
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Itinerary selection */}
          <div className="col-span-1">
            <div className="space-y-4 mb-8">
              {itineraries.map((itinerary) => (
                <div 
                  key={itinerary.id}
                  onClick={() => handleSelect(itinerary.id)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selected === itinerary.id 
                      ? 'transform scale-[1.02]' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <AnimatedCard
                    variant={selected === itinerary.id ? "default" : "subtle"}
                    className={`border-2 ${
                      selected === itinerary.id 
                        ? 'border-primary/70 shadow-lg' 
                        : 'border-transparent'
                    }`}
                    animation="scale"
                  >
                    <h3 className="font-semibold text-lg mb-2">{itinerary.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {itinerary.schedule.length} Activities
                    </p>
                    <Button 
                      variant={selected === itinerary.id ? "default" : "outline"}
                      size="sm"
                      className="mt-2"
                    >
                      {selected === itinerary.id ? 'Selected' : 'Select'}
                    </Button>
                  </AnimatedCard>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side: Schedule display */}
          <div className="col-span-1 lg:col-span-2">
            <AnimatedCard 
              variant="glass" 
              animation="fade" 
              className="h-full"
            >
              {selectedItineraryData ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">{selectedItineraryData.name}</h3>
                  <div className="space-y-4">
                    {selectedItineraryData.schedule.map((item, index) => {
                      // Try to parse the date string to a Date object
                      let dateObj: Date | null = null;
                      try {
                        dateObj = new Date(item.date);
                      } catch (e) {
                        console.error("Invalid date format", item.date);
                      }
                      
                      return (
                        <div 
                          key={index} 
                          className="flex items-start gap-3 p-3 rounded-lg bg-background/30 animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex-shrink-0 bg-primary/20 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center mb-1 text-sm text-primary">
                              <Clock className="inline-block h-3.5 w-3.5 mr-1" />
                              {dateObj && !isNaN(dateObj.getTime()) 
                                ? format(dateObj, 'MMM d, yyyy h:mm a')
                                : item.date
                              }
                            </div>
                            <p className="text-base">{item.event}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select an itinerary to view details
                </div>
              )}
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { ItinerarySelector } from './itinerary/ItinerarySelector';

// Example data
const exampleItineraries = [
  {
    id: 1,
    name: "Weekend in Paris",
    schedule: [
      { date: "2024-07-15T09:00:00", event: "Arrival and check-in at hotel" },
      { date: "2024-07-15T12:30:00", event: "Lunch at Café de Flore" },
      { date: "2024-07-15T14:00:00", event: "Visit the Louvre Museum" },
      { date: "2024-07-15T19:00:00", event: "Dinner at Le Comptoir" },
      { date: "2024-07-16T10:00:00", event: "Visit Eiffel Tower" },
      { date: "2024-07-16T13:00:00", event: "Lunch at Le Jules Verne" },
      { date: "2024-07-16T16:00:00", event: "Shopping at Champs-Élysées" },
      { date: "2024-07-17T09:00:00", event: "Visit Montmartre and Sacré-Cœur" },
      { date: "2024-07-17T14:00:00", event: "Departure" }
    ]
  },
  {
    id: 2,
    name: "Tokyo Adventure",
    schedule: [
      { date: "2024-08-10T08:00:00", event: "Arrival at Narita Airport" },
      { date: "2024-08-10T11:00:00", event: "Check-in at hotel in Shinjuku" },
      { date: "2024-08-10T14:00:00", event: "Visit Meiji Shrine" },
      { date: "2024-08-10T18:00:00", event: "Dinner at Izakaya in Shibuya" },
      { date: "2024-08-11T09:00:00", event: "Tokyo Skytree and Asakusa" },
      { date: "2024-08-11T15:00:00", event: "Shopping in Akihabara" },
      { date: "2024-08-12T10:00:00", event: "Day trip to Hakone" },
      { date: "2024-08-13T09:00:00", event: "Visit Tsukiji Outer Market" },
      { date: "2024-08-13T19:00:00", event: "Dinner at Michelin star restaurant" }
    ]
  },
  {
    id: 3,
    name: "New York City Break",
    schedule: [
      { date: "2024-09-05T10:00:00", event: "Arrival at JFK and hotel check-in" },
      { date: "2024-09-05T14:00:00", event: "Visit Times Square" },
      { date: "2024-09-05T19:00:00", event: "Broadway Show" },
      { date: "2024-09-06T09:00:00", event: "Statue of Liberty & Ellis Island" },
      { date: "2024-09-06T15:00:00", event: "Shopping at 5th Avenue" },
      { date: "2024-09-06T20:00:00", event: "Dinner in SoHo" },
      { date: "2024-09-07T10:00:00", event: "Museum of Modern Art" },
      { date: "2024-09-07T14:00:00", event: "Central Park stroll" },
      { date: "2024-09-07T19:00:00", event: "Rooftop bar experience" }
    ]
  }
];

export const ExampleItinerarySelector: React.FC = () => {
  const [selectedItinerary, setSelectedItinerary] = useState<number>(1);
  
  const handleItinerarySelect = (id: number) => {
    setSelectedItinerary(id);
  };
  
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold mb-2">Popular Itineraries</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular travel itineraries selected by experienced travelers
          </p>
        </div>
        
        <ItinerarySelector 
          itineraries={exampleItineraries} 
          selectedItinerary={selectedItinerary}
          onSelect={handleItinerarySelect}
        />
      </div>
    </div>
  );
};

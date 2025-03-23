
import React, { useState } from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Plus, X, MapPin } from 'lucide-react';
import { Destination } from '@/types';
import { PlaceAutocomplete } from '@/components/ui/PlaceAutocomplete';

interface DestinationStepProps {
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
}

export const DestinationStep: React.FC<DestinationStepProps> = ({
  destinations,
  setDestinations,
}) => {
  const [newDestination, setNewDestination] = useState('');

  const handleAddDestination = () => {
    if (newDestination.trim() === '') return;
    
    const destination = {
      id: Date.now().toString(),
      name: newDestination.trim(),
    };
    
    setDestinations([...destinations, destination]);
    setNewDestination('');
  };

  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">Where do you want to go?</h3>
          <p className="text-muted-foreground text-sm">
            Add the destinations you'd like to visit on your trip.
          </p>
        </div>

        <div className="flex gap-2">
          <PlaceAutocomplete
            value={newDestination}
            onChange={setNewDestination}
            onPlaceSelect={(place) => {
              if (place && place.name) {
                setNewDestination(place.name);
              }
            }}
            className="flex-1"
            placeholder="Add a destination..."
          />
          <Button 
            onClick={handleAddDestination}
            size="icon"
            variant="outline"
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {destinations.length > 0 && (
          <div className="space-y-3 mt-4">
            <p className="text-sm font-medium">Your destinations:</p>
            {destinations.map((destination) => (
              <div 
                key={destination.id}
                className="flex items-center bg-secondary/80 rounded-md p-2 pr-3 animate-scale-in"
              >
                <div className="flex items-center gap-2 flex-1">
                  <MapPin className="h-4 w-4 text-primary opacity-70" />
                  <span className="font-medium">{destination.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleRemoveDestination(destination.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

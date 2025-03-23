
import React, { useState } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import { PlaceAutocomplete } from '@/components/ui/PlaceAutocomplete';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Destination } from '@/types';

interface DestinationInputProps {
  destinations: Destination[];
  onAddDestination: (destination: Destination) => void;
  onRemoveDestination: (id: string) => void;
}

export const DestinationInput: React.FC<DestinationInputProps> = ({
  destinations,
  onAddDestination,
  onRemoveDestination
}) => {
  const [newDestination, setNewDestination] = useState('');

  const handleAddDestination = () => {
    if (newDestination.trim() === '') return;
    
    const destination = {
      id: Date.now().toString(),
      name: newDestination.trim(),
    };
    
    onAddDestination(destination);
    setNewDestination('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Where do you want to go?</label>
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
          placeholder="Add a city or place..."
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
        <div className="flex flex-wrap gap-2 mt-2">
          {destinations.map((destination) => (
            <Badge 
              key={destination.id}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-2"
            >
              <MapPin className="h-3 w-3" />
              {destination.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onRemoveDestination(destination.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TripType } from '@/types';

interface TripTypeSelectorProps {
  tripTypes: TripType[];
  onTripTypeChange: (id: string, checked: boolean) => void;
}

export const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ 
  tripTypes, 
  onTripTypeChange 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {tripTypes.map(type => (
        <div key={type.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`trip-type-${type.id}`} 
            checked={type.selected}
            onCheckedChange={(checked) => 
              onTripTypeChange(type.id, checked as boolean)
            }
          />
          <label 
            htmlFor={`trip-type-${type.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {type.name}
          </label>
        </div>
      ))}
    </div>
  );
};


import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { TransportationType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plane, Car, Train, Ship, Bus, Bike, Footprints, Sailboat
} from 'lucide-react';

interface TransportationStepProps {
  transportationTypes: TransportationType[];
  setTransportationTypes: (types: TransportationType[]) => void;
}

export const TransportationStep: React.FC<TransportationStepProps> = ({
  transportationTypes,
  setTransportationTypes,
}) => {
  const handleToggleTransportation = (id: string) => {
    setTransportationTypes(
      transportationTypes.map(type =>
        type.id === id
          ? { ...type, selected: !type.selected }
          : type
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    const props = { className: "h-5 w-5" };
    switch (iconName) {
      case 'Plane': return <Plane {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Train': return <Train {...props} />;
      case 'Ship': return <Ship {...props} />;
      case 'Bus': return <Bus {...props} />;
      case 'Bike': return <Bike {...props} />;
      case 'Footprints': return <Footprints {...props} />;
      case 'Sailboat': return <Sailboat {...props} />;
      default: return <Plane {...props} />;
    }
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">How do you want to get around?</h3>
          <p className="text-muted-foreground text-sm">
            Select your preferred transportation methods.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {transportationTypes.map((type, index) => (
            <button
              key={type.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-all duration-300",
                "hover:bg-secondary/80 border",
                {
                  "bg-primary/10 border-primary/30": type.selected,
                  "bg-secondary/50 border-transparent": !type.selected,
                }
              )}
              onClick={() => handleToggleTransportation(type.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                type.selected ? "bg-primary/20" : "bg-secondary"
              )}>
                {getIconComponent(type.icon)}
              </div>
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

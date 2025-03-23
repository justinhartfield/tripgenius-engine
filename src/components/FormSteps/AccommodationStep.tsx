
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { AccommodationType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Building2, Home, TreePine, Users, BedDouble, Tent, Castle, Ship
} from 'lucide-react';

interface AccommodationStepProps {
  accommodationTypes: AccommodationType[];
  setAccommodationTypes: (types: AccommodationType[]) => void;
}

export const AccommodationStep: React.FC<AccommodationStepProps> = ({
  accommodationTypes,
  setAccommodationTypes,
}) => {
  const handleToggleAccommodation = (id: string) => {
    setAccommodationTypes(
      accommodationTypes.map(type =>
        type.id === id
          ? { ...type, selected: !type.selected }
          : type
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    const props = { className: "h-5 w-5" };
    switch (iconName) {
      case 'Building2': return <Building2 {...props} />;
      case 'Home': return <Home {...props} />;
      case 'TreePine': return <TreePine {...props} />;
      case 'Users': return <Users {...props} />;
      case 'BedDouble': return <BedDouble {...props} />;
      case 'Tent': return <Tent {...props} />;
      case 'Castle': return <Castle {...props} />;
      case 'Ship': return <Ship {...props} />;
      default: return <Building2 {...props} />;
    }
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">Where would you like to stay?</h3>
          <p className="text-muted-foreground text-sm">
            Select your preferred accommodation types.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {accommodationTypes.map((type, index) => (
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
              onClick={() => handleToggleAccommodation(type.id)}
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

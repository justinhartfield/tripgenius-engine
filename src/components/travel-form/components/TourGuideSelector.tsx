
import React from 'react';
import { User, PartyPopper, Skull, Glasses, Flag, Leaf } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface TourGuideOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// Tour Guide options
const tourGuideOptions: TourGuideOption[] = [
  { id: 'rick-steves', name: 'Rick Steves', icon: 'User', description: 'Cheap and smart yet off the beat choices for sightseeing' },
  { id: 'raver-ricky', name: 'Raver Ricky', icon: 'PartyPopper', description: 'Party scene/Cannabis scene' },
  { id: 'bald-bankrupt', name: 'Bald & Bankrupt', icon: 'Skull', description: 'Adventurous areas and local experiences' },
  { id: 'timeout', name: 'Timeout Magazine', icon: 'Cool', description: 'Coolest Places' },
  { id: 'monocle', name: 'Monocle Magazine', icon: 'Glasses', description: 'Most luxurious' },
  { id: 'tiger-woods', name: 'Tiger Woods', icon: 'Flag', description: 'Best places to golf' },
  { id: 'lonely-planet', name: 'Lonely Planet', icon: 'Leaf', description: 'Adventurers and off the beaten path places' },
];

interface TourGuideSelectorProps {
  selectedTourGuide: string;
  onChange: (value: string) => void;
}

export const TourGuideSelector: React.FC<TourGuideSelectorProps> = ({ 
  selectedTourGuide, 
  onChange 
}) => {
  // Icon mapping function
  const renderTourGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="h-4 w-4" />;
      case 'PartyPopper': return <PartyPopper className="h-4 w-4" />;
      case 'Skull': return <Skull className="h-4 w-4" />;
      case 'Cool': return <span className="text-sm font-semibold">TO</span>;
      case 'Glasses': return <Glasses className="h-4 w-4" />;
      case 'Flag': return <Flag className="h-4 w-4" />;
      case 'Leaf': return <Leaf className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const handleTourGuideChange = (value: string) => {
    if (value) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Choose your travel guide style</label>
      <ToggleGroup 
        type="single" 
        value={selectedTourGuide}
        onValueChange={handleTourGuideChange}
        className="flex flex-wrap justify-start gap-2"
      >
        {tourGuideOptions.map((guide) => (
          <ToggleGroupItem 
            key={guide.id} 
            value={guide.id}
            aria-label={guide.name}
            className="flex flex-col items-center gap-1 py-2 px-3 h-auto min-w-[80px]"
          >
            <div className="h-6 w-6 flex items-center justify-center">
              {renderTourGuideIcon(guide.icon)}
            </div>
            <span className="text-xs font-medium">{guide.name}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      
      {/* Selected Tour Guide Description */}
      <p className="text-sm text-muted-foreground mt-2">
        {tourGuideOptions.find(g => g.id === selectedTourGuide)?.description}
      </p>
    </div>
  );
};

export { tourGuideOptions };

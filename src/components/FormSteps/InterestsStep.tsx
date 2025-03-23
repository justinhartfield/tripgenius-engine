
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Interest } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Map, Utensils, Building, Mountain, Brush, Waves, 
  Ticket, Camera, Wine, Book, Music, Users 
} from 'lucide-react';

interface InterestsStepProps {
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({
  interests,
  setInterests,
}) => {
  const handleToggleInterest = (id: string) => {
    setInterests(
      interests.map(interest =>
        interest.id === id
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    const props = { className: "h-5 w-5" };
    switch (iconName) {
      case 'Map': return <Map {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Museum': return <Building {...props} />; // Using Building icon for Museum
      case 'Mountain': return <Mountain {...props} />;
      case 'Brush': return <Brush {...props} />;
      case 'Waves': return <Waves {...props} />;
      case 'Ticket': return <Ticket {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Wine': return <Wine {...props} />;
      case 'Book': return <Book {...props} />;
      case 'Music': return <Music {...props} />;
      case 'Users': return <Users {...props} />;
      default: return <Map {...props} />;
    }
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">What interests you?</h3>
          <p className="text-muted-foreground text-sm">
            Select the activities and experiences you're interested in.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {interests.map((interest, index) => (
            <button
              key={interest.id}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-md transition-all duration-300",
                "hover:bg-secondary/80 border border-transparent hover:border-border",
                {
                  "bg-primary/10 border-primary/30 text-primary": interest.selected,
                  "bg-secondary/50": !interest.selected,
                }
              )}
              onClick={() => handleToggleInterest(interest.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                interest.selected ? "bg-primary/20" : "bg-secondary"
              )}>
                {getIconComponent(interest.icon)}
              </div>
              <span className="text-xs font-medium">{interest.name}</span>
            </button>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

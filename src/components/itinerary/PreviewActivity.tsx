
import React from 'react';
import { 
  Coffee, Utensils, Camera, Map, Icon
} from 'lucide-react';

interface PreviewActivityProps {
  time: string;
  activity: string;
  interest: string;
  icon?: string;
  animationDelay?: number;
}

export const PreviewActivity: React.FC<PreviewActivityProps> = ({
  time,
  activity,
  interest,
  icon = 'Coffee',
  animationDelay = 0
}) => {
  const getIconComponent = () => {
    switch (icon) {
      case 'Utensils': return <Utensils className="h-4 w-4" />;
      case 'Map': return <Map className="h-4 w-4" />;
      case 'Camera': return <Camera className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="flex items-start gap-2 animate-fade-in" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="bg-primary/10 text-primary rounded-full p-1.5 mt-0.5">
        {getIconComponent()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-xs font-medium">{time}</span>
          <span className="text-xs text-muted-foreground">{interest}</span>
        </div>
        <p className="text-sm mt-0.5">{activity}</p>
      </div>
    </div>
  );
};


import React from 'react';
import { getActivityIcon } from '@/utils/previewUtils';
import { Coffee, Utensils, Map, Camera } from 'lucide-react';

interface PreviewActivityProps {
  time: string;
  activity: string;
  interest: string;
  animationDelay: number;
}

export const PreviewActivity: React.FC<PreviewActivityProps> = ({
  time,
  activity,
  interest,
  animationDelay,
}) => {
  const renderIcon = () => {
    const iconName = getActivityIcon(interest);
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="h-4 w-4" />;
      case 'Map':
        return <Map className="h-4 w-4" />;
      case 'Camera':
        return <Camera className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="flex items-start gap-3 p-2 rounded-md bg-secondary/30 animate-scale-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
        {renderIcon()}
      </div>
      <div>
        <div className="flex items-center">
          <span className="text-xs font-medium text-primary/80">{time}</span>
          <span className="text-xs text-muted-foreground ml-2">• {interest}</span>
        </div>
        <p className="text-sm font-medium mt-0.5">{activity}</p>
      </div>
    </div>
  );
};

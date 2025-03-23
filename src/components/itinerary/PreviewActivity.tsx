
import React, { useState } from 'react';
import { 
  Coffee, Utensils, Camera, Map, Clock, 
  ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface PreviewActivityProps {
  time: string;
  activity: string;
  interest: string;
  icon?: string;
  animationDelay?: number;
  description?: string;
  thumbnail?: string;
}

export const PreviewActivity: React.FC<PreviewActivityProps> = ({
  time,
  activity,
  interest,
  icon = 'Coffee',
  animationDelay = 0,
  description = "Perfect for your travel style and preferences.",
  thumbnail
}) => {
  // Format the activity text by cleaning up any HTML or markdown artifacts
  const formatActivityText = (text: string) => {
    return text
      .replace(/\\\n/g, '\n') // Replace escaped newlines with actual newlines
      .replace(/\\n/g, '\n') // Replace \n with newlines
      .replace(/\n\n###/g, '\n###') // Fix triple hash spacing
      .replace(/\n\n##/g, '\n##') // Fix double hash spacing
      .replace(/\n\n#/g, '\n#') // Fix hash spacing
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\\\*/g, '*') // Replace escaped asterisks
      .replace(/\\/g, '') // Remove any remaining backslashes
      .replace(/\n###\s?/g, '\n') // Remove ### headers
      .replace(/\n##\s?/g, '\n') // Remove ## headers
      .replace(/\n#\s?/g, '\n') // Remove # headers
      .replace(/\|\n\|/g, '\n') // Fix table formatting
  };
  
  const formattedActivity = formatActivityText(activity);
  
  const getIconComponent = () => {
    switch (icon) {
      case 'Utensils': return <Utensils className="h-4 w-4" />;
      case 'Map': return <Map className="h-4 w-4" />;
      case 'Camera': return <Camera className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  // Get color based on activity type
  const getBubbleColor = () => {
    switch (interest.toLowerCase()) {
      case 'food': return 'bg-orange-100 border-orange-200';
      case 'sightseeing': return 'bg-blue-100 border-blue-200';
      case 'adventure': return 'bg-green-100 border-green-200';
      case 'culture': return 'bg-purple-100 border-purple-200';
      case 'relaxation': return 'bg-teal-100 border-teal-200';
      case 'shopping': return 'bg-pink-100 border-pink-200';
      case 'nightlife': return 'bg-indigo-100 border-indigo-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div 
      className="animate-fade-in mb-3" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-12 text-center">
          <span className="text-sm font-medium text-gray-600">{time}</span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className={`rounded-lg border ${getBubbleColor()} shadow-sm overflow-hidden`}>
            <div className="flex p-3">
              {thumbnail && (
                <div className="mr-3 flex-shrink-0">
                  <img 
                    src={thumbnail} 
                    alt={formattedActivity}
                    className="w-12 h-12 object-cover rounded-md" 
                    onError={(e) => {
                      e.currentTarget.src = '/lovable-uploads/33151d87-d1db-4f5a-ac9c-a6c853db8046.png';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">
                      {formattedActivity.split('\n')[0]}
                    </h4>
                    {formattedActivity.split('\n').length > 1 && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {formattedActivity.split('\n').slice(1).join(' ').trim()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center flex-shrink-0 ml-2">
                    <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 mr-2 whitespace-nowrap">
                      {interest}
                    </span>
                    <div className="bg-primary/10 text-primary rounded-full p-1.5">
                      {getIconComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <AccordionTrigger className="px-3 py-1.5 text-xs text-gray-500 hover:no-underline">
              Details
            </AccordionTrigger>
            
            <AccordionContent className="px-3 pb-3 text-sm">
              <div className="text-gray-700 whitespace-pre-line">
                {formattedActivity.split('\n').length > 1 
                  ? formattedActivity
                  : description
                }
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

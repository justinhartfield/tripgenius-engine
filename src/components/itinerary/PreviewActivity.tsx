
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
      case 'Utensils': return <Utensils className="h-5 w-5" />;
      case 'Map': return <Map className="h-5 w-5" />;
      case 'Camera': return <Camera className="h-5 w-5" />;
      default: return <Coffee className="h-5 w-5" />;
    }
  };

  // Get color based on activity type with better contrast
  const getBubbleColor = () => {
    switch (interest.toLowerCase()) {
      case 'food': return 'bg-orange-200 border-orange-300 text-orange-950';
      case 'sightseeing': return 'bg-blue-200 border-blue-300 text-blue-950';
      case 'adventure': return 'bg-green-200 border-green-300 text-green-950';
      case 'culture': return 'bg-purple-200 border-purple-300 text-purple-950';
      case 'relaxation': return 'bg-teal-200 border-teal-300 text-teal-950';
      case 'shopping': return 'bg-pink-200 border-pink-300 text-pink-950';
      case 'nightlife': return 'bg-indigo-200 border-indigo-300 text-indigo-950';
      default: return 'bg-gray-200 border-gray-300 text-gray-950';
    }
  };

  const getTagColor = () => {
    switch (interest.toLowerCase()) {
      case 'food': return 'bg-orange-500/20 text-orange-200';
      case 'sightseeing': return 'bg-blue-500/20 text-blue-200';
      case 'adventure': return 'bg-green-500/20 text-green-200';
      case 'culture': return 'bg-purple-500/20 text-purple-200';
      case 'relaxation': return 'bg-teal-500/20 text-teal-200';
      case 'shopping': return 'bg-pink-500/20 text-pink-200';
      case 'nightlife': return 'bg-indigo-500/20 text-indigo-200';
      default: return 'bg-primary/20 text-primary-foreground';
    }
  };

  return (
    <div 
      className="animate-fade-in mb-6" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 text-center">
          <span className="itinerary-time-label">{time}</span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className={`itinerary-activity-card ${getBubbleColor()}`}>
            <div className="flex p-4">
              {thumbnail && (
                <div className="mr-4 flex-shrink-0">
                  <img 
                    src={thumbnail} 
                    alt={formattedActivity}
                    className="w-14 h-14 object-cover rounded-md" 
                    onError={(e) => {
                      e.currentTarget.src = '/lovable-uploads/33151d87-d1db-4f5a-ac9c-a6c853db8046.png';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-base">
                      {formattedActivity.split('\n')[0]}
                    </h4>
                    {formattedActivity.split('\n').length > 1 && (
                      <p className="text-sm mt-1 line-clamp-1">
                        {formattedActivity.split('\n').slice(1).join(' ').trim()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center flex-shrink-0 ml-2">
                    <span className={`itinerary-tag ${getTagColor()} mr-2`}>
                      {interest}
                    </span>
                    <div className="bg-primary/20 text-primary-foreground rounded-full p-1.5">
                      {getIconComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline">
              Details
            </AccordionTrigger>
            
            <AccordionContent className="px-4 pb-4 text-base">
              <div className="itinerary-detail-text">
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

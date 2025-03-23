
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
  tourGuideType?: string;
}

export const PreviewActivity: React.FC<PreviewActivityProps> = ({
  time,
  activity,
  interest,
  icon = 'Coffee',
  animationDelay = 0,
  description = "Perfect for your travel style and preferences.",
  thumbnail,
  tourGuideType = 'rick-steves'
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

  // Generate guide-specific description if no detailed description exists
  const getGuideSpecificDescription = (activityText: string, guideType: string, activityType: string) => {
    if (formattedActivity.split('\n').length > 1) {
      return formattedActivity; // Use the existing detailed description if it exists
    }
    
    const activityName = activityText.split('\n')[0];
    
    switch (guideType) {
      case 'rick-steves':
        return `${activityName} - Here's a budget-friendly gem that most tourists overlook! I discovered this spot years ago and it offers authentic experiences without breaking the bank. The locals love it, and you'll appreciate the cultural insights you'll gain here. This is exactly the kind of meaningful ${activityType.toLowerCase()} experience I recommend to see the real character of the destination.`;
      
      case 'raver-ricky':
        return `${activityName} - OMG this place is EPIC! The energy here is absolutely insane, and you'll be vibing with the coolest crowd in town. This ${activityType.toLowerCase()} spot is where the real party people hang! The music pumps until dawn and if you're looking to make memories you might not fully remember, this is definitely the place to be! Bring your party A-game! PLUR!`;
      
      case 'bald-bankrupt':
        return `${activityName} - Now this is the real deal, not some tourist trap! What I love about this ${activityType.toLowerCase()} spot is how authentic it is - you'll meet actual locals going about their daily lives, not other tourists. The prices are proper local prices too, and while the service might not be what Westerners expect, that's part of the charm! This is the true essence of the destination that most travelers never experience.`;
      
      case 'timeout':
        return `${activityName} - This trending ${activityType.toLowerCase()} hotspot just made our "Must Visit" list! It's currently the talk of the city with its Instagram-worthy aesthetic and cutting-edge approach. The creative minds behind this concept have crafted something truly of-the-moment, and you'll definitely want to share your experience on social. Don't wait - places like this evolve quickly in the urban landscape.`;
      
      case 'monocle':
        return `${activityName} - This exemplary ${activityType.toLowerCase()} establishment represents the perfect balance of tradition and innovation. The attention to detail is evident in every aspect, from the thoughtfully designed space to the impeccable service. There's an understated elegance here that discerning travelers will appreciate, with quality materials and craftsmanship that speak quietly but confidently about their superior nature.`;
      
      case 'tiger-woods':
        return `${activityName} - I've personally selected this ${activityType.toLowerCase()} experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      
      case 'lonely-planet':
        return `${activityName} - This incredible ${activityType.toLowerCase()} spot is a hidden treasure that rewards those willing to venture beyond the guidebook standards. You'll create genuine connections with locals here and experience the authentic culture of the region. The journey to get here is part of the adventure, and the stories you'll collect will be among your most treasured souvenirs. This is sustainable, responsible travel at its best.`;
      
      default:
        return `This ${activityType.toLowerCase()} activity is perfect for your travel preferences and fits well with your itinerary.`;
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
                      e.currentTarget.src = '/lovable-uploads/b6861889-140f-4408-a15b-99fe791f3df0.png';
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
                {getGuideSpecificDescription(formattedActivity, tourGuideType, interest)}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

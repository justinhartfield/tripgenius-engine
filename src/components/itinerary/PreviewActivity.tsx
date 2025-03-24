
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ActivityThumbnail } from './ActivityThumbnail';
import { ActivityCardHeader } from './ActivityCardHeader';
import { ActivityGuideDescription } from './ActivityGuideDescription';
import { PreviewActivityProps } from './activityTypes';
import { formatActivityText, getTimeOfDayColor } from '@/utils/activityUtils';

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
  const formattedActivity = formatActivityText(activity);
  const activityTitle = formattedActivity.split('\n')[0];
  const activityDescription = formattedActivity.split('\n').length > 1 
    ? formattedActivity.split('\n').slice(1).join(' ').trim() 
    : undefined;

  return (
    <div 
      className="animate-fade-in mb-5" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start gap-3">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className={`itinerary-activity-card ${getTimeOfDayColor(time)}`}>
            <div className="flex p-4">
              <ActivityThumbnail thumbnail={thumbnail} alt={activityTitle} />
              <ActivityCardHeader 
                time={time}
                activityTitle={activityTitle}
                activityDescription={activityDescription}
                interest={interest}
                icon={icon}
              />
            </div>
            
            <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline">
              Details
            </AccordionTrigger>
            
            <AccordionContent className="px-4 pb-4 text-base">
              <ActivityGuideDescription 
                activity={formattedActivity}
                tourGuideType={tourGuideType}
                interestType={interest}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

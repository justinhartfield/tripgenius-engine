
import React, { useEffect, useState } from 'react';
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
import { formatActivityText, getTimeOfDayColor, addHyperlinksToActivityText } from '@/utils/activity';

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
  const activityLines = formattedActivity.split('\n');
  const activityTitle = activityLines[0];
  const activityDescription = activityLines.length > 1 
    ? activityLines.slice(1).join(' ').trim() 
    : undefined;
  
  const [processedContent, setProcessedContent] = useState<React.ReactNode | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Only process hyperlinks if the accordion is expanded to save resources
    if (isExpanded) {
      const processHyperlinks = async () => {
        try {
          const content = await addHyperlinksToActivityText(formattedActivity);
          setProcessedContent(content);
        } catch (error) {
          console.error('Error processing hyperlinks:', error);
          setProcessedContent(<div>{formattedActivity}</div>);
        }
      };
      
      processHyperlinks();
    }
  }, [formattedActivity, isExpanded]);

  return (
    <div 
      className="animate-fade-in mb-5" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start gap-3">
        <Accordion 
          type="single" 
          collapsible 
          className="w-full"
          onValueChange={(value) => setIsExpanded(!!value)}
        >
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
              {isExpanded ? (
                processedContent ? (
                  <div className="activity-details">{processedContent}</div>
                ) : (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-pulse text-gray-400">Loading details...</div>
                  </div>
                )
              ) : (
                <ActivityGuideDescription 
                  activity={formattedActivity}
                  tourGuideType={tourGuideType}
                  interestType={interest}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

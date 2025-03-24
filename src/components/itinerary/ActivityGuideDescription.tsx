
import React from 'react';
import { addHyperlinksToActivityText } from '@/utils/activityUtils';

interface ActivityGuideDescriptionProps {
  activity: string;
  tourGuideType: string;
  interestType: string;
}

export const ActivityGuideDescription: React.FC<ActivityGuideDescriptionProps> = ({
  activity,
  tourGuideType,
  interestType
}) => {
  // Apply hyperlinks to the activity text
  const linkedActivityText = addHyperlinksToActivityText(activity);
  
  // Guide emoji based on tour guide type
  const guideEmoji = 
    tourGuideType === 'rick-steves' ? '🧔' : 
    tourGuideType === 'raver-ricky' ? '🎧' :
    tourGuideType === 'bald-bankrupt' ? '👨‍🦲' :
    tourGuideType === 'timeout' ? '⏰' :
    tourGuideType === 'monocle' ? '🧐' :
    tourGuideType === 'tiger-woods' ? '🏌️' :
    tourGuideType === 'lonely-planet' ? '🌍' : '🧔';
  
  // Interest emoji based on interest type
  const interestEmoji = 
    interestType === 'Food' ? '🍽️' :
    interestType === 'Culture' ? '🏛️' :
    interestType === 'Adventure' ? '🧗' :
    interestType === 'Relaxation' ? '🧘' :
    interestType === 'Shopping' ? '🛍️' :
    interestType === 'Nightlife' ? '🍸' :
    interestType === 'Sightseeing' ? '📷' : '📍';

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 pb-1 border-b border-gray-100">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-lg">
          {guideEmoji}
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Tour Guide Tip</p>
          <p className="text-sm font-medium">
            As your {tourGuideType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} guide, I recommend this {interestEmoji} {interestType.toLowerCase()} activity
          </p>
        </div>
      </div>
      
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: linkedActivityText }}
      />
    </div>
  );
};

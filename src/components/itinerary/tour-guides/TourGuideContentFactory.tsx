
import React from 'react';
import { RestaurantGuideContent } from './content/RestaurantGuideContent';
import { NightlifeGuideContent } from './content/NightlifeGuideContent';
import { SightseeingGuideContent } from './content/SightseeingGuideContent';
import { EducationalGuideContent } from './content/EducationalGuideContent';
import { DefaultGuideContent } from './content/DefaultGuideContent';

interface TourGuideContentProps {
  activityName: string;
  activityType: string;
  interestType: string;
  tourGuideType: string;
}

/**
 * Factory component that returns the appropriate tour guide content based on activity type and guide type
 */
export const TourGuideContentFactory: React.FC<TourGuideContentProps> = ({
  activityName,
  activityType,
  interestType,
  tourGuideType
}) => {
  // Based on the activity type, return the appropriate content component
  switch (activityType) {
    case 'dining':
      return (
        <RestaurantGuideContent 
          activityName={activityName} 
          tourGuideType={tourGuideType} 
        />
      );
    case 'nightlife':
      return (
        <NightlifeGuideContent 
          activityName={activityName} 
          tourGuideType={tourGuideType} 
        />
      );
    case 'sightseeing':
      return (
        <SightseeingGuideContent 
          activityName={activityName} 
          tourGuideType={tourGuideType} 
        />
      );
    case 'educational':
      return (
        <EducationalGuideContent 
          activityName={activityName} 
          tourGuideType={tourGuideType} 
        />
      );
    default:
      return (
        <DefaultGuideContent 
          activityName={activityName}
          interestType={interestType}
          tourGuideType={tourGuideType}
        />
      );
  }
};

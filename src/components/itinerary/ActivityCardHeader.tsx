
import React from 'react';
import { formatTimeDisplay, getIconComponent, getTagColor, getIconBgColor } from '@/utils/activity';
import { extractActivityLocation } from '@/utils/activity/activityTypeDetector';

interface ActivityCardHeaderProps {
  time: string;
  activityTitle: string;
  activityDescription?: string;
  interest: string;
  icon: string;
}

export const ActivityCardHeader: React.FC<ActivityCardHeaderProps> = ({
  time,
  activityTitle,
  activityDescription,
  interest,
  icon
}) => {
  const displayTime = formatTimeDisplay(time);
  const locationTitle = extractActivityLocation(activityTitle);

  return (
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {locationTitle && (
            <div className="text-sm font-medium mb-1 text-gray-600">
              {locationTitle}
            </div>
          )}
          <h4 className="font-semibold text-base">
            {activityTitle}
          </h4>
          {activityDescription && (
            <p className="text-sm mt-1 line-clamp-1 text-gray-700">
              {activityDescription}
            </p>
          )}
        </div>
        
        <div className="flex items-center flex-shrink-0 ml-2">
          <span className={`itinerary-tag ${getTagColor(interest)} mr-2`}>
            {interest}
          </span>
          <div className={`rounded-full p-1.5 ${getIconBgColor(time)}`}>
            {getIconComponent(icon)}
          </div>
        </div>
      </div>
    </div>
  );
};

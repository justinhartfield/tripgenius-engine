
import React from 'react';
import { PreviewActivity } from './PreviewActivity';
import { getActivityIcon } from '@/utils/previewUtils';
import { ActivitySectionProps } from './types';

export const ActivityTimeSection: React.FC<ActivitySectionProps> = ({
  activities,
  icon,
  title,
  titleColor,
  borderColor,
  dayIndex,
  startIndex,
  tourGuideType = 'rick-steves',
  thumbnailFn
}) => {
  if (activities.length === 0) return null;
  
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className={`text-sm font-semibold ${titleColor}`}>{title}</h4>
      </div>
      <div className={`pl-2 border-l-2 ${borderColor}`}>
        {activities.map((activity, actIndex) => (
          <PreviewActivity
            key={`${title.toLowerCase()}-${actIndex}`}
            time={activity.time}
            activity={activity.activity}
            interest={activity.interest}
            icon={getActivityIcon(activity.interest)}
            animationDelay={(dayIndex * 0.1) + (startIndex + actIndex) * 0.05}
            thumbnail={thumbnailFn ? thumbnailFn() : undefined}
            tourGuideType={tourGuideType}
          />
        ))}
      </div>
    </div>
  );
};

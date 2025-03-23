
import React from 'react';

interface ItineraryActivityProps {
  activity: {
    title: string;
    description: string;
    time?: string;
    location?: string;
  }
}

const ItineraryActivity: React.FC<ItineraryActivityProps> = ({ activity }) => (
  <div className="mb-4 pl-4 border-l-2 border-blue-300">
    <div className="flex justify-between">
      <h4 className="font-medium">{activity.title}</h4>
      {activity.time && <span className="text-sm text-gray-500">{activity.time}</span>}
    </div>
    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
    {activity.location && (
      <p className="text-xs text-gray-500 mt-1">
        <span className="font-medium">Location:</span> {activity.location}
      </p>
    )}
  </div>
);

interface ItinerarySectionProps {
  section: {
    id: string;
    title: string;
    content?: string;
    activities?: {
      title: string;
      description: string;
      time?: string;
      location?: string;
    }[];
  };
}

export const ItinerarySection: React.FC<ItinerarySectionProps> = ({ section }) => {
  return (
    <div className="mb-8 p-6 backdrop-blur-sm bg-white/70 rounded-lg shadow-md">
      <h3 className="text-xl font-medium mb-4 text-blue-800">{section.title}</h3>
      
      {section.content && (
        <div className="mb-4 prose prose-blue max-w-none">
          <p>{section.content}</p>
        </div>
      )}
      
      {section.activities && section.activities.length > 0 && (
        <div className="mt-4">
          {section.activities.map((activity, index) => (
            <ItineraryActivity key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

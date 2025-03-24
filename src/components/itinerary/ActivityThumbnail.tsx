
import React from 'react';

interface ActivityThumbnailProps {
  thumbnail?: string;
  alt: string;
}

export const ActivityThumbnail: React.FC<ActivityThumbnailProps> = ({ thumbnail, alt }) => {
  if (!thumbnail) return null;

  return (
    <div className="mr-4 flex-shrink-0">
      <img 
        src={thumbnail} 
        alt={alt}
        className="w-14 h-14 object-cover rounded-md" 
        onError={(e) => {
          e.currentTarget.src = '/lovable-uploads/b6861889-140f-4408-a15b-99fe791f3df0.png';
        }}
      />
    </div>
  );
};

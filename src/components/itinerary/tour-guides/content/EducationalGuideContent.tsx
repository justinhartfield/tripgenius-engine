
import React from 'react';

interface EducationalGuideContentProps {
  activityName: string;
  tourGuideType: string;
}

export const EducationalGuideContent: React.FC<EducationalGuideContentProps> = ({
  activityName,
  tourGuideType
}) => {
  let content = "";
  
  switch (tourGuideType) {
    case 'rick-steves':
      content = `Many travelers miss this intellectual treasure, but wandering through this campus offers insights into local education and architecture at no cost. The buildings tell stories of the region's history, and you might catch students engaged in interesting activities. It's a peaceful place to escape the tourist crowds and experience authentic academic life.`;
      break;
    
    case 'raver-ricky':
      content = `College vibes are THE BEST! This campus has such amazing energy and you might catch some student parties happening! The architecture is trippy if you really look at it, and there are always cool events going on! Perfect spot to recover from last night and plan tonight's adventures with the young crowd! Campus life is its own kind of party!`;
      break;
    
    case 'bald-bankrupt':
      content = `Brilliant example of educational architecture with a fascinating history most travelers completely miss. Walking through these grounds, you can feel the intellectual heritage and perhaps glimpse how the academic system differs from what we're used to. I had a fantastic conversation with a professor here who gave me insights into the local educational traditions. These spontaneous encounters are the true wealth of travel.`;
      break;
    
    case 'timeout':
      content = `This prestigious campus has reinvented itself as a cultural hub where academia meets cutting-edge creativity. Beyond its architectural significance, the university now hosts pop-up exhibitions, thought-provoking lecture series, and innovative installations by emerging artists. The recently renovated central plaza has become a gathering spot for the city's intellectuals and creatives, making this an essential stop for cultural exploration.`;
      break;
    
    case 'monocle':
      content = `This institution of higher learning exemplifies academic excellence and architectural integrity. The campus planning demonstrates a harmonious relationship between built environment and natural landscape, creating spaces conducive to intellectual endeavor. The university's commitment to maintaining its architectural heritage while thoughtfully integrating contemporary facilities demonstrates an admirable long-term vision that prioritizes sustainability and scholarly purpose.`;
      break;
    
    case 'tiger-woods':
      content = `I've personally selected this educational experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      break;
    
    case 'lonely-planet':
      content = `This center of learning offers more than just beautiful architecture – it's a living cultural institution where visitors can experience the intellectual rhythm of local life. Wander beyond the main quadrangles to find hidden gardens, fascinating museums, and perhaps ongoing cultural events open to the public. The campus cafes often provide excellent opportunities to engage with students and faculty for insightful conversations about contemporary local issues.`;
      break;
      
    default:
      content = `This educational site is perfect for your travel preferences and fits well with your itinerary.`;
      break;
  }
  
  return (
    <div>
      <p className="font-semibold text-primary mb-2">{activityName}</p>
      <div className="text-base mt-1">{content}</div>
    </div>
  );
};


import React from 'react';

interface SightseeingGuideContentProps {
  activityName: string;
  tourGuideType: string;
}

export const SightseeingGuideContent: React.FC<SightseeingGuideContentProps> = ({
  activityName,
  tourGuideType
}) => {
  let content = "";
  
  switch (tourGuideType) {
    case 'rick-steves':
      content = `This remarkable site often gets overlooked in mainstream guidebooks, but offers an authentic glimpse into local history and culture. Take your time exploring the less crowded areas where you'll discover fascinating details most tourists miss. The entrance fee is quite reasonable, making this a budget-friendly addition to your itinerary.`;
      break;
    
    case 'raver-ricky':
      content = `Even party people need to see the sights, and this place is ACTUALLY EPIC! The perfect Insta backdrop for your squad shots before hitting the clubs! The energy here is surprisingly awesome for a daytime spot and you might even meet some fellow ravers planning their night out! Take some crazy photos to remember the experience when you're back in party mode!`;
      break;
    
    case 'bald-bankrupt':
      content = `Incredible site that tells the real story of this region, not the polished version they sell to package tourists. While everyone else is queuing for hours at the main attractions, you'll have this place practically to yourself. The local guide I met here shared stories you won't find in any Western guidebook. This is what travel is really about - uncovering these hidden layers of history and culture.`;
      break;
    
    case 'timeout':
      content = `While this destination has long been on the tourist trail, a recent curator-led reinterpretation has transformed it into a must-visit cultural experience. The thoughtfully redesigned visitor journey offers fresh perspectives on familiar sights, while the new digital installations add contemporary context. Don't miss the newly opened viewing area, which offers the most photogenic vista in the city.`;
      break;
    
    case 'monocle':
      content = `This cultural landmark merits unhurried appreciation. Recently subject to a meticulous restoration that respected its historical integrity while discreetly introducing modern conservation techniques. The thoughtful curation emphasizes quality over quantity, allowing visitors to develop a meaningful relationship with the exhibits. The institution's commitment to both preservation and accessibility sets a standard for cultural stewardship.`;
      break;
    
    case 'tiger-woods':
      content = `I've personally selected this sightseeing experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      break;
    
    case 'lonely-planet':
      content = `While this remarkable site deserves its popularity, most visitors only scratch the surface of what it offers. Venture beyond the main viewing areas to discover hidden corners where the true character of the place reveals itself. Coming early morning or late afternoon not only avoids crowds but transforms the experience through changing light. Take time to sit quietly and absorb the atmosphere rather than rushing through – this is when the magic happens.`;
      break;
      
    default:
      content = `This sightseeing destination is perfect for your travel preferences and fits well with your itinerary.`;
      break;
  }
  
  return (
    <div>
      <p className="font-semibold text-primary mb-2">{activityName}</p>
      <div className="text-base mt-1">{content}</div>
    </div>
  );
};

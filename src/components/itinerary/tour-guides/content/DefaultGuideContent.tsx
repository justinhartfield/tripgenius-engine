
import React from 'react';

interface DefaultGuideContentProps {
  activityName: string;
  interestType: string;
  tourGuideType: string;
}

export const DefaultGuideContent: React.FC<DefaultGuideContentProps> = ({
  activityName,
  interestType,
  tourGuideType
}) => {
  let content = "";
  
  switch (tourGuideType) {
    case 'rick-steves':
      content = `Here's a budget-friendly gem that most tourists overlook! I discovered this spot years ago and it offers authentic experiences without breaking the bank. The locals love it, and you'll appreciate the cultural insights you'll gain here. This is exactly the kind of meaningful ${interestType.toLowerCase()} experience I recommend to see the real character of the destination.`;
      break;
    
    case 'raver-ricky':
      content = `OMG this place is EPIC! The energy here is absolutely insane, and you'll be vibing with the coolest crowd in town. This ${interestType.toLowerCase()} spot is where the real party people hang! The music pumps until dawn and if you're looking to make memories you might not fully remember, this is definitely the place to be! Bring your party A-game! PLUR!`;
      break;
    
    case 'bald-bankrupt':
      content = `Now this is the real deal, not some tourist trap! What I love about this ${interestType.toLowerCase()} spot is how authentic it is - you'll meet actual locals going about their daily lives, not other tourists. The prices are proper local prices too, and while the service might not be what Westerners expect, that's part of the charm! This is the true essence of the destination that most travelers never experience.`;
      break;
    
    case 'timeout':
      content = `This trending ${interestType.toLowerCase()} hotspot just made our "Must Visit" list! It's currently the talk of the city with its Instagram-worthy aesthetic and cutting-edge approach. The creative minds behind this concept have crafted something truly of-the-moment, and you'll definitely want to share your experience on social. Don't wait - places like this evolve quickly in the urban landscape.`;
      break;
    
    case 'monocle':
      content = `This exemplary ${interestType.toLowerCase()} establishment represents the perfect balance of tradition and innovation. The attention to detail is evident in every aspect, from the thoughtfully designed space to the impeccable service. There's an understated elegance here that discerning travelers will appreciate, with quality materials and craftsmanship that speak quietly but confidently about their superior nature.`;
      break;
    
    case 'tiger-woods':
      content = `I've personally selected this ${interestType.toLowerCase()} experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      break;
    
    case 'lonely-planet':
      content = `This incredible ${interestType.toLowerCase()} spot is a hidden treasure that rewards those willing to venture beyond the guidebook standards. You'll create genuine connections with locals here and experience the authentic culture of the region. The journey to get here is part of the adventure, and the stories you'll collect will be among your most treasured souvenirs. This is sustainable, responsible travel at its best.`;
      break;
      
    default:
      content = `This ${interestType.toLowerCase()} activity is perfect for your travel preferences and fits well with your itinerary.`;
      break;
  }
  
  return (
    <div>
      <p className="font-semibold text-primary mb-2">{activityName}</p>
      <div className="text-base mt-1">{content}</div>
    </div>
  );
};

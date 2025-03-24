
import React from 'react';

interface NightlifeGuideContentProps {
  activityName: string;
  tourGuideType: string;
}

export const NightlifeGuideContent: React.FC<NightlifeGuideContentProps> = ({
  activityName,
  tourGuideType
}) => {
  let content = "";
  
  switch (tourGuideType) {
    case 'rick-steves':
      content = `Skip the overpriced tourist traps and head to this authentic local hangout where you'll meet real residents enjoying their evening. The atmosphere is casual and welcoming, with reasonable drink prices and a chance to experience genuine local culture. Just remember to be respectful and embrace the different customs you might encounter!`;
      break;
    
    case 'raver-ricky':
      content = `OMG this spot is LEGENDARY!!! The bass drops here will literally shake your soul! Everyone is just radiating positive energy and the light shows are MIND-BLOWING! This is where all the true party people come to experience pure euphoria. The DJs here know exactly how to read the crowd and keep the vibes going until sunrise! PLUR all night long!!!`;
      break;
    
    case 'bald-bankrupt':
      content = `Absolutely mad place! This is proper local nightlife, not some generic club designed for tourists. I found this spot by chatting with some workers at my Soviet-era hotel. The drinks are strong, cheap, and there's not a tourist in sight. Yes, it looks a bit rough around the edges, but these are the experiences you'll remember long after you've forgotten those sanitized holiday resorts.`;
      break;
    
    case 'timeout':
      content = `This buzzing nightlife destination is defining the city's after-dark scene right now! With its perfectly balanced sound system and innovative cocktail menu featuring locally sourced ingredients, it's no wonder this is where the city's creative class gathers nightly. The interior design seamlessly blends industrial elements with luxe touches, creating an atmosphere that feels both exclusive and welcoming.`;
      break;
    
    case 'monocle':
      content = `This discerning establishment offers a refreshing alternative to the typical nightlife venue. The carefully considered acoustic design allows for both vibrant atmosphere and actual conversation. The beverage program focuses on quality craftsmanship rather than fleeting trends, and the thoughtful lighting creates an atmosphere of understated elegance. The crowd is sophisticated without being pretentious.`;
      break;
    
    case 'tiger-woods':
      content = `I've personally selected this nightlife experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      break;
    
    case 'lonely-planet':
      content = `This lively gathering spot offers an authentic glimpse into local nightlife culture away from the typical tourist circuits. Here you'll find a diverse mix of residents unwinding and celebrating – providing a perfect opportunity for cultural immersion and maybe even making new local friends. The unpretentious atmosphere encourages genuine connections, and you might even discover regional drinks and music you'd never encounter in more tourist-oriented venues.`;
      break;
      
    default:
      content = `This nightlife venue is perfect for your travel preferences and fits well with your itinerary.`;
      break;
  }
  
  return (
    <div>
      <p className="font-semibold text-primary mb-2">{activityName}</p>
      <div className="text-base mt-1">{content}</div>
    </div>
  );
};

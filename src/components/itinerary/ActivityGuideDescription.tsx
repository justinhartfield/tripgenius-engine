import React, { useEffect, useState } from 'react';
import { formatActivityText, addHyperlinksToActivityText } from '@/utils/activity';
import { detectActivityType } from '@/utils/activity/activityTypeDetector';
import { TourGuideContentFactory } from './tour-guides/TourGuideContentFactory';

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
  const formattedActivity = formatActivityText(activity);
  const [processedContent, setProcessedContent] = useState<React.ReactNode | null>(null);
  
  useEffect(() => {
    const getDescription = async () => {
      try {
        const guideText = generateGuideSpecificDescription();
        const content = await addHyperlinksToActivityText(guideText);
        setProcessedContent(content);
      } catch (error) {
        console.error('Error processing description:', error);
        setProcessedContent(<div>{formattedActivity}</div>);
      }
    };
    
    getDescription();
  }, [formattedActivity, tourGuideType, interestType]);
  
  // Generate guide-specific description if no detailed description exists
  const generateGuideSpecificDescription = () => {
    if (formattedActivity.split('\n').length > 1) {
      return formattedActivity; // Use the detailed description as is
    }
    
    const activityName = formattedActivity.split('\n')[0];
    
    // Detect the type of activity based on keywords in the name
    const activityType = detectActivityType(activityName);
    
    // Use the TourGuideContentFactory to generate the appropriate content
    return `${activityName}\n\n${getContentForGuide(activityName, activityType)}`;
  };
  
  // Helper function to get the appropriate content based on activity type and tour guide
  const getContentForGuide = (activityName: string, activityType: string): string => {
    // This could be expanded with more sophisticated content generation logic if needed
    switch (activityType) {
      case 'dining':
        return getDiningContent();
      case 'nightlife':
        return getNightlifeContent();
      case 'sightseeing':
        return getSightseeingContent();
      case 'educational':
        return getEducationalContent();
      default:
        return getDefaultContent();
    }
  };
  
  // Content generators for each activity type
  const getDiningContent = () => {
    switch (tourGuideType) {
      case 'rick-steves':
        return "This charming local eatery offers an authentic taste of the region at reasonable prices. The menu focuses on traditional specialties using fresh ingredients from nearby producers. Don't miss their signature dishes recommended by locals. The casual atmosphere makes this a perfect spot to relax and enjoy a meal without tourist markups.";
      case 'raver-ricky':
        return `DUDE, the VIBE in this place is NEXT LEVEL! The food here will BLOW YOUR MIND and fuel you up for an epic night ahead! The crowd is totally cool and the atmosphere is pumping even before the main party starts! Pre-game here with some amazing bites and get ready for the night of your life! The cocktail menu is INSANE!`;
      case 'bald-bankrupt':
        return `Forget those tourist restaurants with their inflated prices. This is where the locals actually eat, and you can tell by the authentic atmosphere and honest prices. I stumbled upon this place completely by accident while exploring the back streets. The menu might not be in English and the service won't pamper you, but that's exactly how you know it's the real deal. Absolutely brilliant!`;
      case 'timeout':
        return `This culinary hotspot has quickly become the talk of the city's dining scene! The innovative chef is pushing boundaries with a menu that's both approachable and exciting. The carefully curated interior design creates the perfect ambiance for your Instagram feed, while the expertly crafted cocktail program complements the seasonal menu perfectly. Book well in advance as tables here are the most coveted in town right now.`;
      case 'monocle':
        return `This refined dining establishment represents gastronomy at its most thoughtful. The proprietor's commitment to quality is evident in every detail, from the provenance of ingredients to the handcrafted tableware. The menu demonstrates a deep understanding of culinary tradition while incorporating subtle contemporary elements. Service strikes a perfect balance between attentiveness and discretion, creating an atmosphere of quiet sophistication.`;
      case 'tiger-woods':
        return `I've personally selected this dining experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      case 'lonely-planet':
        return `This authentic eatery offers a genuine taste of local culinary traditions in a setting where travelers and residents share tables and stories. Family-owned for generations, the recipes here have been passed down and perfected over decades. Don't be afraid to ask the welcoming staff about the history of certain dishes – they're often happy to share the cultural context behind their food. An affordable and memorable dining experience.`;
      default:
        return `This dining spot is perfect for your travel preferences and fits well with your itinerary.`;
    }
  };
  
  const getNightlifeContent = () => {
    switch (tourGuideType) {
      case 'rick-steves':
        return "Skip the overpriced tourist traps and head to this authentic local hangout where you'll meet real residents enjoying their evening. The atmosphere is casual and welcoming, with reasonable drink prices and a chance to experience genuine local culture. Just remember to be respectful and embrace the different customs you might encounter!";
      case 'raver-ricky':
        return `OMG this spot is LEGENDARY!!! The bass drops here will literally shake your soul! Everyone is just radiating positive energy and the light shows are MIND-BLOWING! This is where all the true party people come to experience pure euphoria. The DJs here know exactly how to read the crowd and keep the vibes going until sunrise! PLUR all night long!!!`;
      case 'bald-bankrupt':
        return `Absolutely mad place! This is proper local nightlife, not some generic club designed for tourists. I found this spot by chatting with some workers at my Soviet-era hotel. The drinks are strong, cheap, and there's not a tourist in sight. Yes, it looks a bit rough around the edges, but these are the experiences you'll remember long after you've forgotten those sanitized holiday resorts.`;
      case 'timeout':
        return `This buzzing nightlife destination is defining the city's after-dark scene right now! With its perfectly balanced sound system and innovative cocktail menu featuring locally sourced ingredients, it's no wonder this is where the city's creative class gathers nightly. The interior design seamlessly blends industrial elements with luxe touches, creating an atmosphere that feels both exclusive and welcoming.`;
      case 'monocle':
        return `This discerning establishment offers a refreshing alternative to the typical nightlife venue. The carefully considered acoustic design allows for both vibrant atmosphere and actual conversation. The beverage program focuses on quality craftsmanship rather than fleeting trends, and the thoughtful lighting creates an atmosphere of understated elegance. The crowd is sophisticated without being pretentious.`;
      case 'tiger-woods':
        return `I've personally selected this nightlife experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      case 'lonely-planet':
        return `This lively gathering spot offers an authentic glimpse into local nightlife culture away from the typical tourist circuits. Here you'll find a diverse mix of residents unwinding and celebrating – providing a perfect opportunity for cultural immersion and maybe even making new local friends. The unpretentious atmosphere encourages genuine connections, and you might even discover regional drinks and music you'd never encounter in more tourist-oriented venues.`;
      default:
        return `This nightlife venue is perfect for your travel preferences and fits well with your itinerary.`;
    }
  };
  
  const getSightseeingContent = () => {
    switch (tourGuideType) {
      case 'rick-steves':
        return "This remarkable site often gets overlooked in mainstream guidebooks, but offers an authentic glimpse into local history and culture. Take your time exploring the less crowded areas where you'll discover fascinating details most tourists miss. The entrance fee is quite reasonable, making this a budget-friendly addition to your itinerary.";
      case 'raver-ricky':
        return `Even party people need to see the sights, and this place is ACTUALLY EPIC! The perfect Insta backdrop for your squad shots before hitting the clubs! The energy here is surprisingly awesome for a daytime spot and you might even meet some fellow ravers planning their night out! Take some crazy photos to remember the experience when you're back in party mode!`;
      case 'bald-bankrupt':
        return `Incredible site that tells the real story of this region, not the polished version they sell to package tourists. While everyone else is queuing for hours at the main attractions, you'll have this place practically to yourself. The local guide I met here shared stories you won't find in any Western guidebook. This is what travel is really about - uncovering these hidden layers of history and culture.`;
      case 'timeout':
        return `While this destination has long been on the tourist trail, a recent curator-led reinterpretation has transformed it into a must-visit cultural experience. The thoughtfully redesigned visitor journey offers fresh perspectives on familiar sights, while the new digital installations add contemporary context. Don't miss the newly opened viewing area, which offers the most photogenic vista in the city.`;
      case 'monocle':
        return `This cultural landmark merits unhurried appreciation. Recently subject to a meticulous restoration that respected its historical integrity while discreetly introducing modern conservation techniques. The thoughtful curation emphasizes quality over quantity, allowing visitors to develop a meaningful relationship with the exhibits. The institution's commitment to both preservation and accessibility sets a standard for cultural stewardship.`;
      case 'tiger-woods':
        return `I've personally selected this sightseeing experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      case 'lonely-planet':
        return `While this remarkable site deserves its popularity, most visitors only scratch the surface of what it offers. Venture beyond the main viewing areas to discover hidden corners where the true character of the place reveals itself. Coming early morning or late afternoon not only avoids crowds but transforms the experience through changing light. Take time to sit quietly and absorb the atmosphere rather than rushing through – this is when the magic happens.`;
      default:
        return `This sightseeing destination is perfect for your travel preferences and fits well with your itinerary.`;
    }
  };
  
  const getEducationalContent = () => {
    switch (tourGuideType) {
      case 'rick-steves':
        return "Many travelers miss this intellectual treasure, but wandering through this campus offers insights into local education and architecture at no cost. The buildings tell stories of the region's history, and you might catch students engaged in interesting activities. It's a peaceful place to escape the tourist crowds and experience authentic academic life.";
      case 'raver-ricky':
        return `College vibes are THE BEST! This campus has such amazing energy and you might catch some student parties happening! The architecture is trippy if you really look at it, and there are always cool events going on! Perfect spot to recover from last night and plan tonight's adventures with the young crowd! Campus life is its own kind of party!`;
      case 'bald-bankrupt':
        return `Brilliant example of educational architecture with a fascinating history most travelers completely miss. Walking through these grounds, you can feel the intellectual heritage and perhaps glimpse how the academic system differs from what we're used to. I had a fantastic conversation with a professor here who gave me insights into the local educational traditions. These spontaneous encounters are the true wealth of travel.`;
      case 'timeout':
        return `This prestigious campus has reinvented itself as a cultural hub where academia meets cutting-edge creativity. Beyond its architectural significance, the university now hosts pop-up exhibitions, thought-provoking lecture series, and innovative installations by emerging artists. The recently renovated central plaza has become a gathering spot for the city's intellectuals and creatives, making this an essential stop for cultural exploration.`;
      case 'monocle':
        return `This institution of higher learning exemplifies academic excellence and architectural integrity. The campus planning demonstrates a harmonious relationship between built environment and natural landscape, creating spaces conducive to intellectual endeavor. The university's commitment to maintaining its architectural heritage while thoughtfully integrating contemporary facilities demonstrates an admirable long-term vision that prioritizes sustainability and scholarly purpose.`;
      case 'tiger-woods':
        return `I've personally selected this educational experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      case 'lonely-planet':
        return `This center of learning offers more than just beautiful architecture – it's a living cultural institution where visitors can experience the intellectual rhythm of local life. Wander beyond the main quadrangles to find hidden gardens, fascinating museums, and perhaps ongoing cultural events open to the public. The campus cafes often provide excellent opportunities to engage with students and faculty for insightful conversations about contemporary local issues.`;
      default:
        return `This educational site is perfect for your travel preferences and fits well with your itinerary.`;
    }
  };
  
  const getDefaultContent = () => {
    switch (tourGuideType) {
      case 'rick-steves':
        return `Here's a budget-friendly gem that most tourists overlook! I discovered this spot years ago and it offers authentic experiences without breaking the bank. The locals love it, and you'll appreciate the cultural insights you'll gain here. This is exactly the kind of meaningful ${interestType.toLowerCase()} experience I recommend to see the real character of the destination.`;
      case 'raver-ricky':
        return `OMG this place is EPIC! The energy here is absolutely insane, and you'll be vibing with the coolest crowd in town. This ${interestType.toLowerCase()} spot is where the real party people hang! The music pumps until dawn and if you're looking to make memories you might not fully remember, this is definitely the place to be! Bring your party A-game! PLUR!`;
      case 'bald-bankrupt':
        return `Now this is the real deal, not some tourist trap! What I love about this ${interestType.toLowerCase()} spot is how authentic it is - you'll meet actual locals going about their daily lives, not other tourists. The prices are proper local prices too, and while the service might not be what Westerners expect, that's part of the charm! This is the true essence of the destination that most travelers never experience.`;
      case 'timeout':
        return `This trending ${interestType.toLowerCase()} hotspot just made our "Must Visit" list! It's currently the talk of the city with its Instagram-worthy aesthetic and cutting-edge approach. The creative minds behind this concept have crafted something truly of-the-moment, and you'll definitely want to share your experience on social. Don't wait - places like this evolve quickly in the urban landscape.`;
      case 'monocle':
        return `This exemplary ${interestType.toLowerCase()} establishment represents the perfect balance of tradition and innovation. The attention to detail is evident in every aspect, from the thoughtfully designed space to the impeccable service. There's an understated elegance here that discerning travelers will appreciate, with quality materials and craftsmanship that speak quietly but confidently about their superior nature.`;
      case 'tiger-woods':
        return `I've personally selected this ${interestType.toLowerCase()} experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      case 'lonely-planet':
        return `This incredible ${interestType.toLowerCase()} spot is a hidden treasure that rewards those willing to venture beyond the guidebook standards. You'll create genuine connections with locals here and experience the authentic culture of the region. The journey to get here is part of the adventure, and the stories you'll collect will be among your most treasured souvenirs. This is sustainable, responsible travel at its best.`;
      default:
        return `This ${interestType.toLowerCase()} activity is perfect for your travel preferences and fits well with your itinerary.`;
    }
  };

  // If the activity has only one line (just the title), render the appropriate guide content component
  if (formattedActivity.split('\n').length === 1) {
    const activityName = formattedActivity.split('\n')[0];
    const activityType = detectActivityType(activityName);
    
    return (
      <div className="itinerary-detail-text mt-2">
        {processedContent || (
          <TourGuideContentFactory 
            activityName={activityName}
            activityType={activityType}
            interestType={interestType}
            tourGuideType={tourGuideType}
          />
        )}
      </div>
    );
  }

  // Otherwise render the processed content or loading state
  return (
    <div className="itinerary-detail-text mt-2">
      {processedContent || <div>Loading description...</div>}
    </div>
  );
};

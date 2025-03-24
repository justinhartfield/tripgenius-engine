
import React from 'react';

interface RestaurantGuideContentProps {
  activityName: string;
  tourGuideType: string;
}

export const RestaurantGuideContent: React.FC<RestaurantGuideContentProps> = ({
  activityName,
  tourGuideType
}) => {
  let content = "";
  
  switch (tourGuideType) {
    case 'rick-steves':
      content = `This charming local eatery offers an authentic taste of the region at reasonable prices. The menu focuses on traditional specialties using fresh ingredients from nearby producers. Don't miss their signature dishes recommended by locals. The casual atmosphere makes this a perfect spot to relax and enjoy a meal without tourist markups.`;
      break;
    
    case 'raver-ricky':
      content = `DUDE, the VIBE in this place is NEXT LEVEL! The food here will BLOW YOUR MIND and fuel you up for an epic night ahead! The crowd is totally cool and the atmosphere is pumping even before the main party starts! Pre-game here with some amazing bites and get ready for the night of your life! The cocktail menu is INSANE!`;
      break;
    
    case 'bald-bankrupt':
      content = `Forget those tourist restaurants with their inflated prices. This is where the locals actually eat, and you can tell by the authentic atmosphere and honest prices. I stumbled upon this place completely by accident while exploring the back streets. The menu might not be in English and the service won't pamper you, but that's exactly how you know it's the real deal. Absolutely brilliant!`;
      break;
    
    case 'timeout':
      content = `This culinary hotspot has quickly become the talk of the city's dining scene! The innovative chef is pushing boundaries with a menu that's both approachable and exciting. The carefully curated interior design creates the perfect ambiance for your Instagram feed, while the expertly crafted cocktail program complements the seasonal menu perfectly. Book well in advance as tables here are the most coveted in town right now.`;
      break;
    
    case 'monocle':
      content = `This refined dining establishment represents gastronomy at its most thoughtful. The proprietor's commitment to quality is evident in every detail, from the provenance of ingredients to the handcrafted tableware. The menu demonstrates a deep understanding of culinary tradition while incorporating subtle contemporary elements. Service strikes a perfect balance between attentiveness and discretion, creating an atmosphere of quiet sophistication.`;
      break;
    
    case 'tiger-woods':
      content = `I've personally selected this dining experience for its exceptional quality and the way it complements your golfing itinerary. This spot offers the perfect balance of relaxation and preparation for your next round, with premium amenities that serious golfers appreciate. The staff understands the needs of players and provides service that helps you maintain your focus on perfecting your game.`;
      break;
    
    case 'lonely-planet':
      content = `This authentic eatery offers a genuine taste of local culinary traditions in a setting where travelers and residents share tables and stories. Family-owned for generations, the recipes here have been passed down and perfected over decades. Don't be afraid to ask the welcoming staff about the history of certain dishes – they're often happy to share the cultural context behind their food. An affordable and memorable dining experience.`;
      break;
      
    default:
      content = `This dining spot is perfect for your travel preferences and fits well with your itinerary.`;
      break;
  }
  
  return (
    <div>
      <p className="font-semibold text-primary mb-2">{activityName}</p>
      <div className="text-base mt-1">{content}</div>
    </div>
  );
};

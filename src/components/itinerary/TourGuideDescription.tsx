
import React from 'react';
import { TravelPreferences } from '@/types';
import { tourGuideOptions } from '@/components/travel-form/components/TourGuideSelector';

interface TourGuideDescriptionProps {
  travelPreferences?: TravelPreferences;
}

export const TourGuideDescription: React.FC<TourGuideDescriptionProps> = ({ travelPreferences }) => {
  if (!travelPreferences) return null;

  const { tourGuidePreference, destinations } = travelPreferences;
  
  // Find selected tour guide
  const selectedGuide = tourGuideOptions.find(guide => guide.id === tourGuidePreference);
  if (!selectedGuide) return null;

  // Get destination names as string
  const destinationNames = destinations.map(dest => dest.name).join(', ');
  
  // Generate description based on the selected tour guide's style
  const getGuideDescription = () => {
    switch (selectedGuide.id) {
      case 'rick-steves':
        return (
          <p className="text-base leading-relaxed">
            Hi there, Rick Steves here! I'm thrilled to be your guide to {destinationNames}. 
            In this carefully crafted itinerary, I've focused on authentic experiences that won't break the bank. 
            You'll discover hidden corners that most tourists miss, connect with locals, and experience the true cultural essence of each destination. 
            I've included budget-friendly accommodations with character, family-run restaurants serving authentic cuisine, and cultural insights that will 
            enrich your journey. My approach is all about smart travel—maximizing experiences while minimizing costs. 
            This isn't just sightseeing; it's a thoughtful exploration that will leave you with meaningful connections and memories. 
            Remember, travel is a skill you develop, and this itinerary is designed to help you travel like a temporary local rather than a tourist. 
            Keep your mind open, your travel skills sharp, and you'll bring home the best souvenir: a broader perspective.
          </p>
        );
      
      case 'raver-ricky':
        return (
          <p className="text-base leading-relaxed">
            What's up party people! Raver Ricky in the house, ready to guide you through the most epic adventure in {destinationNames}! 
            This isn't your grandma's travel itinerary—we're talking next-level nightlife experiences that'll have you dancing till dawn! 
            I've mapped out all the hottest clubs, underground raves, and bangin' party districts where the real magic happens after dark. 
            For those green-friendly destinations, I've got you covered with the chillest spots to elevate your experience (always keeping it legal, fam). 
            During daylight hours, hit those recovery brunches and chill lounges I've listed to recharge for the next night of madness. 
            The accommodations I've picked are all party-central locations—walking distance from the action so you can stumble home safely. 
            This itinerary is for those who believe sleep is for the weak and life is for living at maximum volume! 
            Bring your best festival outfits, your endless energy, and let's make memories that'll be legendary even if you can't remember them all! PLUR!
          </p>
        );
        
      case 'bald-bankrupt':
        return (
          <p className="text-base leading-relaxed">
            Hello everybody! Welcome to {destinationNames}—not the {destinationNames} from glossy travel magazines, but the real one where actual people live their lives. 
            I've created this itinerary to take you beyond the sanitized tourist zones into neighborhoods with authentic character and stories to tell. 
            We'll venture where few travelers dare, meeting locals in their everyday environments—from market vendors to babushkas on park benches. 
            You'll find hidden Soviet-era architecture, local watering holes where a beer costs pennies, and homes where families might invite you in for a meal if you smile enough. 
            This journey isn't about luxury—it's about genuine human connections and seeing places as they truly are, both beautiful and occasionally gritty. 
            I've included some accommodations in residential areas where English might be limited, but the hospitality is unlimited. 
            Keep your wits about you, respect the local customs, and you'll experience something far more valuable than any five-star resort could offer—authenticity. 
            Let's get the marshrutka and explore!
          </p>
        );
        
      case 'timeout':
        return (
          <p className="text-base leading-relaxed">
            Your definitive guide to {destinationNames} starts now! TimeOut has curated the ultimate itinerary featuring only the most current, Instagram-worthy spots that matter right now. 
            We've scouted the cutting-edge neighborhoods where creative energy flows through industrial-chic cafés serving deconstructed cuisine and third-wave coffee. 
            Your days will be filled with independent art galleries showcasing emerging talents, concept stores redefining retail therapy, and pop-up events that won't exist next season. 
            By night, transition to speakeasy cocktail bars with mixologists who consider themselves liquid artists, followed by music venues where you'll catch bands before they blow up. 
            The accommodations we've selected favor design-forward boutique hotels where the lobby doubles as a co-working space for digital nomads and local creatives. 
            This itinerary ensures you'll experience {destinationNames} not as it was or will be, but precisely as it is in this moment—vibrant, evolving, and undeniably cool. 
            Don't just visit; be part of the cultural conversation that's happening right now.
          </p>
        );
        
      case 'monocle':
        return (
          <p className="text-base leading-relaxed">
            Monocle presents a meticulously curated journey through {destinationNames}, designed for the discerning traveler who appreciates understated luxury and impeccable quality. 
            This itinerary favors establishments with longevity and purpose—family-owned businesses with heritage, artisanal producers who honor traditional craftsmanship, and spaces where thoughtful design enhances the human experience. 
            You'll dine at restaurants where chefs maintain personal relationships with local producers, shop at carefully edited boutiques offering items of enduring value rather than momentary trends, and rest in accommodations where attention to detail elevates the ordinary to the exceptional. 
            We've intentionally avoided overtly ostentatious venues, instead focusing on places where quality speaks quietly but confidently. 
            Cultural selections emphasize substance over spectacle—thought-provoking exhibitions, architectural marvels that serve their communities, and experiences that engage rather than merely entertain. 
            This journey reflects Monocle's belief that true luxury lies not in fleeting extravagance but in thoughtful curation, authentic experiences, and environments created with integrity and intelligence. 
            Welcome to travel as it should be.
          </p>
        );
        
      case 'tiger-woods':
        return (
          <p className="text-base leading-relaxed">
            Welcome to your premium golf experience in {destinationNames}! I've crafted this itinerary to showcase the most exceptional courses this destination has to offer. 
            You'll tee off on championship fairways where major tournaments have been decided, experiencing the same challenging holes that have tested the world's best players. 
            I've arranged early morning tee times to catch the courses in perfect condition, with afternoons dedicated to improving your game through sessions with top local pros who understand the nuances of these specific greens and fairways. 
            The accommodations selected are all renowned golf resorts where you can analyze your round over premium whiskey in the clubhouse, or prepare for tomorrow's game with state-of-the-art practice facilities. 
            For equipment needs, I've identified the best pro shops with custom fitting services and the latest technology. 
            Even your dining experiences complement your golf—restaurants with views overlooking the courses and menus designed to provide optimal energy for your game. 
            Non-golfing travel companions will find excellent spa services and alternative activities, but this journey is ultimately designed for those who understand that a great golf course isn't just played—it's experienced.
          </p>
        );
        
      case 'lonely-planet':
        return (
          <p className="text-base leading-relaxed">
            Welcome to {destinationNames}, intrepid traveler! This Lonely Planet itinerary is your passport to extraordinary experiences beyond the well-trodden tourist path. 
            We've mapped out routes that balance must-see landmarks with hidden gems that only locals usually know about. 
            You'll traverse breathtaking natural landscapes, from mountain trails with panoramic vistas to secluded beaches accessible only by local boats. 
            In urban areas, we'll guide you through vibrant markets where you can sample authentic street food for pocket change, and introduce you to community-based initiatives where your tourism dollars make a direct positive impact. 
            The accommodations range from eco-friendly lodges nestled in nature to family-run guesthouses where hosts share tales of local history over home-cooked breakfasts. 
            This journey emphasizes sustainable travel practices throughout, with options for public transportation adventures and opportunities to participate in environmental conservation efforts. 
            Pack light, bring an open mind, and prepare for genuine encounters that will challenge your perspectives and create stories you'll share for years to come. 
            Remember: the best journeys aren't about the destination—they're about who you become along the way.
          </p>
        );
        
      default:
        return (
          <p className="text-base leading-relaxed">
            Welcome to your personalized journey through {destinationNames}! This itinerary has been crafted to provide you with a balanced mix of must-see attractions and off-the-beaten-path experiences. 
            You'll have opportunities to immerse yourself in local culture, sample authentic cuisine, and create memories that will last a lifetime. 
            From comfortable accommodations to efficient transportation options, every aspect of this trip has been considered to ensure a smooth and enjoyable travel experience. 
            Whether you're seeking adventure, relaxation, or cultural enrichment, this carefully planned itinerary aims to fulfill your travel aspirations while leaving room for spontaneous discoveries along the way.
          </p>
        );
    }
  };

  return (
    <div className="my-8 px-4 py-6 bg-primary/5 rounded-lg border border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={`/lovable-uploads/2b3cb4f5-0e0d-4e34-98ad-e9b83d0f5e8a.png`} 
          alt={selectedGuide.name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-lg font-semibold">{selectedGuide.name}</h3>
          <p className="text-sm text-muted-foreground">{selectedGuide.description}</p>
        </div>
      </div>
      
      <div className="prose prose-sm md:prose-base max-w-none">
        {getGuideDescription()}
      </div>
    </div>
  );
};


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { fetchItinerary } from '@/utils/openaiApi';
import { useTravelPreferences } from '@/contexts/TravelPreferencesContext';
import { slugify } from '@/utils/stringUtils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const examples = [
  {
    title: "Weekend in Paris",
    description: "Cultural exploration in the City of Light",
    destinations: ["Paris, France"],
    interests: ["Cultural", "Food & Drink", "Art"],
    days: 3
  },
  {
    title: "Thailand Adventure",
    description: "Island hopping & exotic cuisine",
    destinations: ["Bangkok, Thailand", "Phuket, Thailand"],
    interests: ["Adventure", "Beach", "Food & Drink"],
    days: 7
  },
  {
    title: "Italian Road Trip",
    description: "From Rome to Florence to Venice",
    destinations: ["Rome, Italy", "Florence, Italy", "Venice, Italy"],
    interests: ["Cultural", "Food & Drink", "Photography"],
    days: 10
  },
  {
    title: "NYC City Break",
    description: "The ultimate Big Apple experience",
    destinations: ["New York City, USA"],
    interests: ["Cultural", "Entertainment", "Food & Drink"],
    days: 4
  }
];

export const ExampleItineraries: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    preferences, 
    setDestinations, 
    setDateRange, 
    setInterests,
    openaiApiKey 
  } = useTravelPreferences();

  const handleExampleClick = async (example: typeof examples[0]) => {
    if (!openaiApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key in the last step of the form before generating an itinerary.",
        variant: "destructive"
      });
      return;
    }

    try {
      toast({
        title: "Generating Itinerary",
        description: `Creating your ${example.title} itinerary...`,
      });

      // Update preferences for the chosen example
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + example.days - 1);

      // Set destinations
      setDestinations(example.destinations.map(name => ({ 
        id: name.toLowerCase().replace(/\s/g, '-'),
        name 
      })));
      
      // Set date range
      setDateRange({ startDate, endDate });
      
      // Set interests
      setInterests(preferences.interests.map(interest => ({
        ...interest,
        selected: example.interests.includes(interest.name)
      })));

      // Update preferences with the current values
      const updatedPreferences = {
        ...preferences,
        destinations: example.destinations.map(name => ({ 
          id: name.toLowerCase().replace(/\s/g, '-'),
          name 
        })),
        dateRange: { startDate, endDate },
        interests: preferences.interests.map(interest => ({
          ...interest,
          selected: example.interests.includes(interest.name)
        }))
      };

      // Generate itinerary with improved error handling
      const itineraryResult = await fetchItinerary(openaiApiKey, updatedPreferences, true);
      
      // Check if the result is a string (error or unparsed content)
      let itineraryData;
      if (typeof itineraryResult === 'string') {
        // Try to parse JSON if it's a string that may contain JSON
        try {
          // Look for JSON-like content in the string
          const jsonMatch = itineraryResult.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            itineraryData = JSON.parse(jsonMatch[0]);
          } else {
            // If no JSON found, create a basic structure
            itineraryData = {
              title: `${example.title}`,
              description: `A ${example.days}-day trip to ${example.destinations.join(', ')}`,
              content: itineraryResult
            };
          }
        } catch (e) {
          console.warn('Failed to parse JSON response, creating basic structure', e);
          // Create basic structure if JSON parsing fails
          itineraryData = {
            title: `${example.title}`,
            description: `A ${example.days}-day trip to ${example.destinations.join(', ')}`,
            content: itineraryResult
          };
        }
      } else {
        // If it's already an object, use it directly
        itineraryData = itineraryResult;
      }
      
      // Create a slug and navigate
      const slug = slugify(itineraryData.title || example.title);
      navigate(`/itinerary/${slug}`, { 
        state: { 
          itineraryData: {
            ...itineraryData,
            slug
          }, 
          preferences: updatedPreferences 
        } 
      });
    } catch (error) {
      console.error('Error generating example itinerary:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your example itinerary. Please try again or create a custom one.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-medium">Example Itineraries</h2>
      </div>
      
      <p className="text-center text-muted-foreground mb-6">
        Try one of these curated trips or create your own
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((example, index) => (
          <div 
            key={index}
            className="glass-card p-5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => handleExampleClick(example)}
          >
            <h3 className="font-semibold text-lg">{example.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {example.destinations.map((dest, i) => (
                <span key={i} className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded-full">
                  {dest}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {example.interests.slice(0, 3).map((interest, i) => (
                  <span key={i} className="text-xs text-muted-foreground">
                    {i > 0 && "•"} {interest}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{example.days} days</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

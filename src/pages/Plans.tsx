
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Filter, Search } from 'lucide-react';
import { TravelPreferences } from '@/types';
import { GeneratedItineraryContent } from '@/utils/itinerary';

// Define the structure of a saved plan
interface SavedPlan {
  slug: string;
  itineraryData: GeneratedItineraryContent;
  preferences: TravelPreferences;
  createdAt: number; // timestamp
}

const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<SavedPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  
  // Load plans from localStorage
  useEffect(() => {
    const storedPlans = localStorage.getItem('travel_plans');
    if (storedPlans) {
      try {
        const parsedPlans = JSON.parse(storedPlans) as SavedPlan[];
        // Sort by newest first
        const sortedPlans = parsedPlans.sort((a, b) => b.createdAt - a.createdAt);
        setPlans(sortedPlans);
        setFilteredPlans(sortedPlans);
      } catch (error) {
        console.error('Error parsing stored plans:', error);
      }
    }
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = [...plans];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(plan => 
        plan.itineraryData.title.toLowerCase().includes(term) ||
        plan.itineraryData.description.toLowerCase().includes(term) ||
        plan.preferences.destinations.some(dest => dest.name.toLowerCase().includes(term))
      );
    }
    
    // Apply destination filter
    if (selectedDestination) {
      results = results.filter(plan => 
        plan.preferences.destinations.some(dest => dest.name === selectedDestination)
      );
    }
    
    // Apply interest filter
    if (selectedInterest) {
      results = results.filter(plan => 
        plan.preferences.interests.some(interest => 
          interest.name === selectedInterest && interest.selected
        )
      );
    }
    
    setFilteredPlans(results);
  }, [plans, searchTerm, selectedDestination, selectedInterest]);

  // Extract all unique destinations from plans
  const allDestinations = [...new Set(
    plans.flatMap(plan => plan.preferences.destinations.map(dest => dest.name))
  )];
  
  // Extract all unique interests from plans that are selected
  const allInterests = [...new Set(
    plans.flatMap(plan => 
      plan.preferences.interests
        .filter(interest => interest.selected)
        .map(interest => interest.name)
    )
  )];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDestination(null);
    setSelectedInterest(null);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>Browse Travel Plans | Travel Itinerary Planner</title>
        <meta name="description" content="Browse and search through personalized AI-generated travel itineraries and plans." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Travel Plans</h1>
        <p className="text-muted-foreground mb-6">Browse and search through your personalized travel itineraries</p>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={clearFilters}
                disabled={!searchTerm && !selectedDestination && !selectedInterest}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Link to="/">
                <Button>Create New Plan</Button>
              </Link>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-2">
            {allDestinations.map(destination => (
              <Button
                key={destination}
                variant={selectedDestination === destination ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedDestination(
                  selectedDestination === destination ? null : destination
                )}
              >
                <MapPin className="h-3 w-3" />
                {destination}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allInterests.map(interest => (
              <Button
                key={interest}
                variant={selectedInterest === interest ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedInterest(
                  selectedInterest === interest ? null : interest
                )}
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No plans found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or create a new travel plan</p>
            <Link to="/">
              <Button>Create New Plan</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlans.map((plan) => {
              const { startDate, endDate } = plan.preferences.dateRange;
              const dateStr = startDate && endDate 
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : 'Flexible dates';
                
              return (
                <Card key={plan.slug} className="overflow-hidden flex flex-col">
                  <div className="p-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                      {plan.itineraryData.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {plan.itineraryData.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {plan.preferences.destinations.map(d => d.name).join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{dateStr}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t">
                    <Link to={`/plans/${plan.slug}`}>
                      <Button variant="outline" className="w-full">View Plan</Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;

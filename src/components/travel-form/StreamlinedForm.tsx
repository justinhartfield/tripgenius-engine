
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PlaceAutocomplete } from '@/components/ui/PlaceAutocomplete';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  X, 
  MapPin, 
  CreditCard, 
  Settings, 
  Smile,
  Users
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { 
  Destination, 
  DateRange, 
  TripMood, 
  TripType
} from '@/types';
import { useTravelPreferences } from '@/contexts/TravelPreferencesContext';

// Mood options
const moodOptions: TripMood[] = [
  { id: '1', name: 'Relaxing', icon: 'Coffee', selected: false },
  { id: '2', name: 'Adventurous', icon: 'Mountain', selected: false },
  { id: '3', name: 'Romantic', icon: 'Heart', selected: false },
  { id: '4', name: 'Cultural', icon: 'Globe', selected: false },
  { id: '5', name: 'Party', icon: 'Music', selected: false },
];

// Trip type options
const tripTypeOptions: TripType[] = [
  { id: '1', name: 'Family', icon: 'Users', selected: false },
  { id: '2', name: 'Couples', icon: 'Heart', selected: false },
  { id: '3', name: 'Solo', icon: 'User', selected: false },
  { id: '4', name: 'Friends', icon: 'Users', selected: false },
  { id: '5', name: 'Bachelor/Hen', icon: 'GlassFull', selected: false },
  { id: '6', name: 'Business', icon: 'Briefcase', selected: false },
  { id: '7', name: 'Spa', icon: 'Spa', selected: false },
];

export const StreamlinedForm: React.FC = () => {
  const { 
    preferences, 
    setDestinations, 
    setDateRange, 
    setBudget, 
    setMood,
    setTripType,
    setFamilyOptions,
    openaiApiKey,
    handleGenerate
  } = useTravelPreferences();
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDateChange = (range: { from: Date; to: Date }) => {
    if (range.from && range.to) {
      setDateRange({
        startDate: range.from,
        endDate: range.to
      });
    }
  };
  
  const handleAddDestination = () => {
    if (newDestination.trim() === '') return;
    
    const destination = {
      id: Date.now().toString(),
      name: newDestination.trim(),
    };
    
    setDestinations([...preferences.destinations, destination]);
    setNewDestination('');
  };

  const handleRemoveDestination = (id: string) => {
    setDestinations(preferences.destinations.filter(dest => dest.id !== id));
  };
  
  const handleBudgetChange = (values: number[]) => {
    setBudget({
      ...preferences.budget,
      min: values[0],
      max: values[1]
    });
  };
  
  const handleTripTypeChange = (id: string, checked: boolean) => {
    const updatedTypes = preferences.tripTypes.map(type => 
      type.id === id ? { ...type, selected: checked } : type
    );
    setTripType(updatedTypes);
    
    // If family is selected/unselected, reset family options
    const isFamilySelected = updatedTypes.find(t => t.id === '1')?.selected;
    if (!isFamilySelected) {
      setFamilyOptions({
        hasPool: false,
        hasConnectedBeds: false,
        hasPlayground: false,
        isChildFriendly: false
      });
    }
  };
  
  const handleMoodChange = (id: string, checked: boolean) => {
    const updatedMoods = preferences.mood.map(mood => 
      mood.id === id ? { ...mood, selected: checked } : mood
    );
    setMood(updatedMoods);
  };
  
  const handleAgeChange = (age: string) => {
    // Implementation for age selection
  };
  
  const handleFamilyOptionChange = (option: keyof typeof preferences.familyOptions, value: boolean) => {
    setFamilyOptions({
      ...preferences.familyOptions,
      [option]: value
    });
  };
  
  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    await handleGenerate();
    setIsGenerating(false);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: preferences.budget.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Check if family trip type is selected
  const isFamilySelected = preferences.tripTypes.find(t => t.id === '1')?.selected;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Your Travel Itinerary</CardTitle>
          <CardDescription>Fill in the basics or configure advanced options for a more personalized trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Destinations */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Destinations</label>
              <div className="flex gap-2">
                <PlaceAutocomplete
                  value={newDestination}
                  onChange={setNewDestination}
                  onPlaceSelect={(place) => {
                    if (place && place.name) {
                      setNewDestination(place.name);
                    }
                  }}
                  className="flex-1"
                  placeholder="Add a city or place..."
                />
                <Button 
                  onClick={handleAddDestination}
                  size="icon"
                  variant="outline"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {preferences.destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {preferences.destinations.map((destination) => (
                    <Badge 
                      key={destination.id}
                      variant="secondary"
                      className="flex items-center gap-1 py-1 px-2"
                    >
                      <MapPin className="h-3 w-3" />
                      {destination.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveDestination(destination.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {preferences.dateRange.startDate && preferences.dateRange.endDate ? (
                      <span>
                        {format(preferences.dateRange.startDate, 'PPP')} - {format(preferences.dateRange.endDate, 'PPP')}
                      </span>
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={preferences.dateRange.startDate || new Date()}
                    selected={{
                      from: preferences.dateRange.startDate || undefined,
                      to: preferences.dateRange.endDate || undefined
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        handleDateChange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Budget Range</label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(preferences.budget.min)} - {formatCurrency(preferences.budget.max)}
                </span>
              </div>
              <Slider
                defaultValue={[preferences.budget.min, preferences.budget.max]}
                max={10000}
                step={100}
                onValueChange={handleBudgetChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Budget</span>
                <span>Luxury</span>
              </div>
            </div>
            
            {/* Trip Mood Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Smile className="h-4 w-4" />
                Trip Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {preferences.mood.map(mood => (
                  <Badge 
                    key={mood.id}
                    variant={mood.selected ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleMoodChange(mood.id, !mood.selected)}
                  >
                    {mood.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Advanced Options Toggle */}
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings className="mr-2 h-4 w-4" />
                {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
              </Button>
            </div>
            
            {/* Advanced Options */}
            {showAdvanced && (
              <Accordion type="single" collapsible className="w-full">
                {/* Trip Type */}
                <AccordionItem value="trip-type">
                  <AccordionTrigger>Trip Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {preferences.tripTypes.map(type => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`trip-type-${type.id}`} 
                            checked={type.selected}
                            onCheckedChange={(checked) => 
                              handleTripTypeChange(type.id, checked as boolean)
                            }
                          />
                          <label 
                            htmlFor={`trip-type-${type.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Age Range */}
                <AccordionItem value="age-range">
                  <AccordionTrigger>Age Range</AccordionTrigger>
                  <AccordionContent>
                    <Select onValueChange={handleAgeChange} defaultValue={preferences.ageRange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All ages</SelectItem>
                        <SelectItem value="children">With young children (0-12)</SelectItem>
                        <SelectItem value="teens">With teenagers (13-17)</SelectItem>
                        <SelectItem value="young-adults">Young adults (18-30)</SelectItem>
                        <SelectItem value="adults">Adults (30-60)</SelectItem>
                        <SelectItem value="seniors">Seniors (60+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Family Options - Only show if Family trip type is selected */}
                {isFamilySelected && (
                  <AccordionItem value="family-options">
                    <AccordionTrigger>Family Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="has-pool" 
                            checked={preferences.familyOptions.hasPool}
                            onCheckedChange={(checked) => 
                              handleFamilyOptionChange('hasPool', checked)
                            }
                          />
                          <label htmlFor="has-pool">Accommodation with pool</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="has-connected-beds" 
                            checked={preferences.familyOptions.hasConnectedBeds}
                            onCheckedChange={(checked) => 
                              handleFamilyOptionChange('hasConnectedBeds', checked)
                            }
                          />
                          <label htmlFor="has-connected-beds">Connected/adjoining rooms</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="has-playground" 
                            checked={preferences.familyOptions.hasPlayground}
                            onCheckedChange={(checked) => 
                              handleFamilyOptionChange('hasPlayground', checked)
                            }
                          />
                          <label htmlFor="has-playground">Kid-friendly activities/playground</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="is-child-friendly" 
                            checked={preferences.familyOptions.isChildFriendly}
                            onCheckedChange={(checked) => 
                              handleFamilyOptionChange('isChildFriendly', checked)
                            }
                          />
                          <label htmlFor="is-child-friendly">Child-friendly restaurants</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            )}
            
            {/* Generate Button */}
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={handleGenerateItinerary}
              disabled={isGenerating || !openaiApiKey || preferences.destinations.length === 0}
            >
              {isGenerating ? 'Generating...' : 'Generate Itinerary'}
            </Button>
            
            {!openaiApiKey && (
              <p className="text-sm text-red-500 text-center mt-2">
                Please set your OpenAI API key in the advanced settings to generate an itinerary.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

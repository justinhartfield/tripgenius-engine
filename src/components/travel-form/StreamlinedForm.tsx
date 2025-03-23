
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTravelPreferences } from '@/contexts/TravelPreferencesContext';
import { Destination, TripType } from '@/types';

import {
  TourGuideSelector,
  DestinationInput,
  PersonalNotes,
  AdvancedOptions,
  GenerateButton
} from './components';

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
    setTripType,
    setFamilyOptions,
    openaiApiKey,
    handleGenerate,
    setPersonalPreferences,
    setTourGuidePreference
  } = useTravelPreferences();
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');
  const [selectedTourGuide, setSelectedTourGuide] = useState('rick-steves');
  
  const handleDateChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
  };
  
  const handleAddDestination = (destination: Destination) => {
    setDestinations([...preferences.destinations, destination]);
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
  
  const handleTourGuideChange = (value: string) => {
    setSelectedTourGuide(value);
    setTourGuidePreference(value);
  };
  
  const handlePersonalNotesChange = (value: string) => {
    setPersonalNotes(value);
    setPersonalPreferences(value);
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
  
  const handleAgeRangeChange = (value: string) => {
    // This is a placeholder as the original code doesn't actually update the age range
    console.log("Age range selected:", value);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Your Travel Itinerary</CardTitle>
          <CardDescription>Tell us where you want to go and let our AI travel guides create your perfect trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Destinations */}
            <DestinationInput 
              destinations={preferences.destinations} 
              onAddDestination={handleAddDestination} 
              onRemoveDestination={handleRemoveDestination} 
            />
            
            {/* Personal Notes */}
            <PersonalNotes 
              value={personalNotes} 
              onChange={handlePersonalNotesChange} 
            />
            
            {/* Tour Guide Selection */}
            <TourGuideSelector 
              selectedTourGuide={selectedTourGuide} 
              onChange={handleTourGuideChange} 
            />
            
            {/* Advanced Options */}
            <AdvancedOptions 
              showAdvanced={showAdvanced}
              onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
              dateRange={preferences.dateRange}
              onDateChange={handleDateChange}
              budget={preferences.budget}
              onBudgetChange={handleBudgetChange}
              tripTypes={preferences.tripTypes}
              onTripTypeChange={handleTripTypeChange}
              ageRange={preferences.ageRange}
              onAgeRangeChange={handleAgeRangeChange}
              familyOptions={preferences.familyOptions}
              onFamilyOptionChange={handleFamilyOptionChange}
            />
            
            {/* Generate Button */}
            <GenerateButton 
              onClick={handleGenerateItinerary}
              disabled={preferences.destinations.length === 0}
              isGenerating={isGenerating}
              hasApiKey={!!openaiApiKey}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

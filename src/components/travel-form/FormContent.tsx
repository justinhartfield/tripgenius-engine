
import React from 'react';
import { DestinationStep } from '@/components/FormSteps/DestinationStep';
import { DateStep } from '@/components/FormSteps/DateStep';
import { InterestsStep } from '@/components/FormSteps/InterestsStep';
import { BudgetStep } from '@/components/FormSteps/BudgetStep';
import { AccommodationStep } from '@/components/FormSteps/AccommodationStep';
import { TransportationStep } from '@/components/FormSteps/TransportationStep';
import { ReviewStep } from '@/components/FormSteps/ReviewStep';
import { useTravelPreferences } from '@/contexts/TravelPreferencesContext';

interface FormContentProps {
  currentStep: number;
}

export const FormContent: React.FC<FormContentProps> = ({ currentStep }) => {
  const { 
    preferences, 
    setDestinations, 
    setDateRange, 
    setInterests, 
    setBudget, 
    setAccommodationTypes, 
    setTransportationTypes,
    openaiApiKey,
    setOpenaiApiKey
  } = useTravelPreferences();

  switch (currentStep) {
    case 0:
      return (
        <DestinationStep 
          destinations={preferences.destinations} 
          setDestinations={setDestinations} 
        />
      );
    case 1:
      return (
        <DateStep 
          dateRange={preferences.dateRange} 
          setDateRange={setDateRange} 
        />
      );
    case 2:
      return (
        <InterestsStep 
          interests={preferences.interests} 
          setInterests={setInterests} 
        />
      );
    case 3:
      return (
        <BudgetStep 
          budget={preferences.budget} 
          setBudget={setBudget} 
        />
      );
    case 4:
      return (
        <AccommodationStep 
          accommodationTypes={preferences.accommodationTypes} 
          setAccommodationTypes={setAccommodationTypes} 
        />
      );
    case 5:
      return (
        <TransportationStep 
          transportationTypes={preferences.transportationTypes} 
          setTransportationTypes={setTransportationTypes} 
        />
      );
    case 6:
      return (
        <ReviewStep 
          preferences={preferences} 
          onApiKeyChange={setOpenaiApiKey}
          apiKeyConfigured={!!openaiApiKey}
        />
      );
    default:
      return null;
  }
};

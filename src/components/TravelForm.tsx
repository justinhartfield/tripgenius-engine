
import React, { useState } from 'react';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { DestinationStep } from '@/components/FormSteps/DestinationStep';
import { DateStep } from '@/components/FormSteps/DateStep';
import { InterestsStep } from '@/components/FormSteps/InterestsStep';
import { BudgetStep } from '@/components/FormSteps/BudgetStep';
import { AccommodationStep } from '@/components/FormSteps/AccommodationStep';
import { TransportationStep } from '@/components/FormSteps/TransportationStep';
import { ReviewStep } from '@/components/FormSteps/ReviewStep';
import { ItineraryPreview } from '@/components/ItineraryPreview';
import { ItineraryDisplay } from '@/components/ItineraryDisplay';
import { FormNavigation } from '@/components/FormSteps/FormNavigation';
import { TravelPreferences, Destination, DateRange, Interest, BudgetRange, AccommodationType, TransportationType } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { getStoredApiKey } from '@/utils/openaiApi';
import { generateItinerary, validateStep } from '@/utils/itineraryUtils';

const STEPS = [
  'Destination',
  'Dates',
  'Interests',
  'Budget',
  'Accommodation',
  'Transportation',
  'Review'
];

export const TravelForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [openaiApiKey, setOpenaiApiKey] = useState(getStoredApiKey());
  
  const [travelPreferences, setTravelPreferences] = useState<TravelPreferences>({
    destinations: [],
    dateRange: {
      startDate: null,
      endDate: null
    },
    interests: [
      { id: '1', name: 'Food & Drink', icon: 'Utensils', selected: false },
      { id: '2', name: 'Cultural', icon: 'Museum', selected: false },
      { id: '3', name: 'Adventure', icon: 'Mountain', selected: false },
      { id: '4', name: 'Nature', icon: 'TreePine', selected: false },
      { id: '5', name: 'Art', icon: 'Brush', selected: false },
      { id: '6', name: 'Beach', icon: 'Waves', selected: false },
      { id: '7', name: 'Entertainment', icon: 'Ticket', selected: false },
      { id: '8', name: 'Photography', icon: 'Camera', selected: false },
      { id: '9', name: 'Wine', icon: 'Wine', selected: false },
    ],
    budget: {
      min: 1000,
      max: 5000,
      currency: 'USD'
    },
    accommodationTypes: [
      { id: '1', name: 'Hotel', icon: 'Building2', selected: false },
      { id: '2', name: 'Apartment', icon: 'Home', selected: false },
      { id: '3', name: 'Resort', icon: 'Castle', selected: false },
      { id: '4', name: 'Cabin', icon: 'TreePine', selected: false },
      { id: '5', name: 'Hostel', icon: 'Users', selected: false },
      { id: '6', name: 'Camping', icon: 'Tent', selected: false },
    ],
    transportationTypes: [
      { id: '1', name: 'Flight', icon: 'Plane', selected: false },
      { id: '2', name: 'Train', icon: 'Train', selected: false },
      { id: '3', name: 'Car Rental', icon: 'Car', selected: false },
      { id: '4', name: 'Bus', icon: 'Bus', selected: false },
      { id: '5', name: 'Ferry', icon: 'Ship', selected: false },
      { id: '6', name: 'Walking', icon: 'Footprints', selected: false },
    ]
  });

  // Preference setter functions
  const setDestinations = (destinations: Destination[]) => {
    setTravelPreferences(prev => ({ ...prev, destinations }));
  };

  const setDateRange = (dateRange: DateRange) => {
    setTravelPreferences(prev => ({ ...prev, dateRange }));
  };

  const setInterests = (interests: Interest[]) => {
    setTravelPreferences(prev => ({ ...prev, interests }));
  };

  const setBudget = (budget: BudgetRange) => {
    setTravelPreferences(prev => ({ ...prev, budget }));
  };

  const setAccommodationTypes = (accommodationTypes: AccommodationType[]) => {
    setTravelPreferences(prev => ({ ...prev, accommodationTypes }));
  };

  const setTransportationTypes = (transportationTypes: TransportationType[]) => {
    setTravelPreferences(prev => ({ ...prev, transportationTypes }));
  };

  // Navigation functions
  const nextStep = () => {
    if (!validateStep(currentStep, travelPreferences, toast)) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerateItinerary = async () => {
    await generateItinerary(
      travelPreferences,
      openaiApiKey,
      () => setIsGenerating(true),
      (result) => {
        setGeneratedItinerary(result);
        setIsGenerating(false);
      }
    );
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <DestinationStep 
            destinations={travelPreferences.destinations} 
            setDestinations={setDestinations} 
          />
        );
      case 1:
        return (
          <DateStep 
            dateRange={travelPreferences.dateRange} 
            setDateRange={setDateRange} 
          />
        );
      case 2:
        return (
          <InterestsStep 
            interests={travelPreferences.interests} 
            setInterests={setInterests} 
          />
        );
      case 3:
        return (
          <BudgetStep 
            budget={travelPreferences.budget} 
            setBudget={setBudget} 
          />
        );
      case 4:
        return (
          <AccommodationStep 
            accommodationTypes={travelPreferences.accommodationTypes} 
            setAccommodationTypes={setAccommodationTypes} 
          />
        );
      case 5:
        return (
          <TransportationStep 
            transportationTypes={travelPreferences.transportationTypes} 
            setTransportationTypes={setTransportationTypes} 
          />
        );
      case 6:
        return (
          <ReviewStep 
            preferences={travelPreferences} 
            onApiKeyChange={setOpenaiApiKey}
            apiKeyConfigured={!!openaiApiKey}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
      <StepIndicator 
        steps={STEPS} 
        currentStep={currentStep} 
        onStepClick={goToStep}
        className="mb-8" 
      />

      <div className="mb-8">
        {renderStepContent()}
      </div>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={STEPS.length}
        isGenerating={isGenerating}
        hasApiKey={!!openaiApiKey}
        onPrevStep={prevStep}
        onNextStep={nextStep}
        onGenerate={handleGenerateItinerary}
      />

      <ItineraryDisplay itinerary={generatedItinerary} />
      
      {!generatedItinerary && (
        <ItineraryPreview preferences={travelPreferences} />
      )}
    </section>
  );
};

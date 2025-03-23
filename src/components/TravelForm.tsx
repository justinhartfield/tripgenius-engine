import React, { useState } from 'react';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/button';
import { DestinationStep } from '@/components/FormSteps/DestinationStep';
import { DateStep } from '@/components/FormSteps/DateStep';
import { InterestsStep } from '@/components/FormSteps/InterestsStep';
import { BudgetStep } from '@/components/FormSteps/BudgetStep';
import { AccommodationStep } from '@/components/FormSteps/AccommodationStep';
import { TransportationStep } from '@/components/FormSteps/TransportationStep';
import { ReviewStep } from '@/components/FormSteps/ReviewStep';
import { ItineraryPreview } from '@/components/ItineraryPreview';
import { TravelPreferences, Destination, DateRange, Interest, BudgetRange, AccommodationType, TransportationType } from '@/types';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { fetchItinerary, getStoredApiKey } from '@/utils/openaiApi';

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

  const nextStep = () => {
    if (currentStep === 0 && travelPreferences.destinations.length === 0) {
      toast({
        title: "Please add at least one destination",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && (!travelPreferences.dateRange.startDate || !travelPreferences.dateRange.endDate)) {
      toast({
        title: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

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
    if (!openaiApiKey) {
      toast({
        title: "OpenAI API Key Required",
        description: "Please set your OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    toast({
      title: "Generating your personalized itinerary",
      description: "Your perfect trip plan is being created. This might take a moment.",
    });
    
    try {
      const itinerary = await fetchItinerary(openaiApiKey, travelPreferences);
      setGeneratedItinerary(itinerary);
      toast({
        title: "Your itinerary is ready!",
        description: "Scroll down to view your personalized travel plan.",
      });
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Error generating itinerary",
        description: error instanceof Error ? error.message : "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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

      <div className="flex justify-between mt-8 max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 || isGenerating}
          className="transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button onClick={nextStep} disabled={isGenerating}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleGenerateItinerary} 
            className="bg-primary hover:bg-primary/90"
            disabled={isGenerating || !openaiApiKey}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Itinerary
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>

      {generatedItinerary ? (
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Your Personalized Travel Itinerary</h2>
          <div className="prose prose-sm md:prose-base lg:prose-lg mx-auto bg-white rounded-lg shadow-md p-6 markdown-content">
            <div dangerouslySetInnerHTML={{ __html: generatedItinerary.replace(/\n/g, '<br />') }} />
          </div>
        </div>
      ) : (
        <ItineraryPreview preferences={travelPreferences} />
      )}
    </section>
  );
};

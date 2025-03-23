
import React from 'react';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { ItineraryPreview } from '@/components/ItineraryPreview';
import { FormNavigation } from '@/components/FormSteps/FormNavigation';
import { FormContent } from '@/components/travel-form/FormContent';
import { TravelPreferencesProvider, useTravelPreferences } from '@/contexts/TravelPreferencesContext';
import { useFormNavigation, STEPS } from '@/hooks/useFormNavigation';

const TravelFormContent: React.FC = () => {
  const { preferences, openaiApiKey } = useTravelPreferences();
  
  const {
    currentStep,
    isGenerating,
    generatedItinerary,
    nextStep,
    prevStep,
    goToStep,
    handleGenerateItinerary
  } = useFormNavigation({ 
    travelPreferences: preferences,
    openaiApiKey
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
      <StepIndicator 
        steps={STEPS} 
        currentStep={currentStep} 
        onStepClick={goToStep}
        className="mb-8" 
      />

      <div className="mb-8">
        <FormContent currentStep={currentStep} />
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
      
      {!generatedItinerary && (
        <ItineraryPreview preferences={preferences} />
      )}
    </section>
  );
};

export const TravelForm: React.FC = () => {
  return (
    <TravelPreferencesProvider>
      <TravelFormContent />
    </TravelPreferencesProvider>
  );
};

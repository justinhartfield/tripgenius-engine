import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { TravelPreferences } from '@/types';
import { validateStep, generateItinerary, GeneratedItineraryContent } from '@/utils/itinerary';

export const STEPS = [
  'Destination',
  'Dates',
  'Interests',
  'Budget',
  'Accommodation',
  'Transportation',
  'Review'
];

interface UseFormNavigationProps {
  travelPreferences: TravelPreferences;
  openaiApiKey: string;
}

export const useFormNavigation = ({ travelPreferences, openaiApiKey }: UseFormNavigationProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItineraryContent | null>(null);

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
      (result, preferences) => {
        setGeneratedItinerary(result);
        setIsGenerating(false);
        
        // Navigate to the itinerary page if we have a result
        if (result) {
          navigate(`/itinerary/${result.slug}`, {
            state: {
              itineraryData: result,
              preferences
            }
          });
        }
      }
    );
  };

  return {
    currentStep,
    isGenerating,
    generatedItinerary,
    nextStep,
    prevStep,
    goToStep,
    handleGenerateItinerary
  };
};

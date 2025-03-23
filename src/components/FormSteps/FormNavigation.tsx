
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isGenerating: boolean;
  hasApiKey: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onGenerate: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  isGenerating,
  hasApiKey,
  onPrevStep,
  onNextStep,
  onGenerate,
}) => {
  return (
    <div className="flex justify-between mt-8 max-w-md mx-auto">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 0 || isGenerating}
        className="transition-all duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {currentStep < totalSteps - 1 ? (
        <Button onClick={onNextStep} disabled={isGenerating}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          onClick={onGenerate} 
          className="bg-primary hover:bg-primary/90"
          disabled={isGenerating || !hasApiKey}
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
  );
};

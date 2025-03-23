
import React from 'react';
import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
  hasApiKey: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  disabled,
  isGenerating,
  hasApiKey
}) => {
  return (
    <>
      <Button 
        className="w-full mt-4" 
        size="lg"
        onClick={onClick}
        disabled={disabled || isGenerating || !hasApiKey}
      >
        {isGenerating ? 'Generating...' : 'Generate Itinerary'}
      </Button>
      
      {!hasApiKey && (
        <p className="text-sm text-red-500 text-center mt-2">
          Please set your OpenAI API key in the advanced settings to generate an itinerary.
        </p>
      )}
    </>
  );
};

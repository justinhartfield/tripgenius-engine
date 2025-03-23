
import React from 'react';
import { Check, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center space-x-1 sm:space-x-2">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = index < currentStep;
          
          return (
            <React.Fragment key={`step-${index}`}>
              <button
                className={cn(
                  "flex items-center justify-center rounded-full transition-colors",
                  "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium",
                  isActive ? "bg-primary text-primary-foreground" : 
                  isCompleted ? "bg-primary/20 text-primary hover:bg-primary/30" : 
                  "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                onClick={() => onStepClick(index)}
                aria-current={isActive ? "step" : undefined}
                disabled={!isCompleted && !isActive}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </button>
              
              {index < steps.length - 1 && (
                <ChevronsRight className="h-4 w-4 text-muted-foreground" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

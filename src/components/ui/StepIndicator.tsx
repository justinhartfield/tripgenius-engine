
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('flex justify-center w-full py-6', className)}>
      <div className="flex items-center space-x-1 md:space-x-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  'flex flex-col items-center transition-all duration-300',
                  {
                    'cursor-pointer': onStepClick && isCompleted,
                    'opacity-40': !isCompleted && !isCurrent,
                  }
                )}
                onClick={() => {
                  if (onStepClick && isCompleted) {
                    onStepClick(index);
                  }
                }}
              >
                <div className="hidden md:block text-xs font-medium mb-2 text-center">
                  {step}
                </div>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border transition-all duration-300',
                    {
                      'bg-primary text-primary-foreground border-primary': isCompleted || isCurrent,
                      'border-border': !isCompleted && !isCurrent,
                      'scale-110': isCurrent,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn('h-px w-8 md:w-12 bg-border transition-all duration-300', {
                    'bg-primary': index < currentStep,
                  })}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

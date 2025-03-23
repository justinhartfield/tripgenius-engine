
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Slider } from '@/components/ui/slider';
import { BudgetRange } from '@/types';
import { 
  CreditCard,
  DollarSign,
  EuroIcon,
  CircleDollarSign,
  PoundSterling,
  YenIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BudgetStepProps {
  budget: BudgetRange;
  setBudget: (budget: BudgetRange) => void;
}

const currencyOptions = [
  { symbol: 'USD', icon: DollarSign },
  { symbol: 'EUR', icon: EuroIcon },
  { symbol: 'GBP', icon: PoundSterling },
  { symbol: 'JPY', icon: YenIcon },
];

export const BudgetStep: React.FC<BudgetStepProps> = ({
  budget,
  setBudget,
}) => {
  const handleSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setBudget({
        ...budget,
        min: values[0],
        max: values[1]
      });
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setBudget({
      ...budget,
      currency
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getCurrencyIcon = (symbol: string) => {
    const option = currencyOptions.find(o => o.symbol === symbol);
    const IconComponent = option?.icon || CircleDollarSign;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">What's your budget?</h3>
          <p className="text-muted-foreground text-sm">
            Set your approximate budget range for the trip.
          </p>
        </div>

        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center gap-2 bg-secondary/60 rounded-md p-2 px-3">
            <CreditCard className="h-4 w-4 text-primary opacity-70" />
            <span className="font-medium">
              {formatCurrency(budget.min)} - {formatCurrency(budget.max)}
            </span>
          </div>
        </div>

        <div className="pt-4 px-2">
          <Slider
            defaultValue={[budget.min, budget.max]}
            max={10000}
            step={100}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Budget</span>
            <span>Luxury</span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium mb-2">Currency</p>
          <div className="flex gap-2 justify-center">
            {currencyOptions.map(option => (
              <Button
                key={option.symbol}
                variant={budget.currency === option.symbol ? "default" : "outline"}
                size="sm"
                className={cn("min-w-16", {
                  "bg-primary/90": budget.currency === option.symbol
                })}
                onClick={() => handleCurrencyChange(option.symbol)}
              >
                <option.icon className="h-4 w-4 mr-1" />
                {option.symbol}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

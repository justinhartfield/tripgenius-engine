
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { BudgetRange } from '@/types';

interface BudgetSelectorProps {
  budget: BudgetRange;
  onBudgetChange: (values: number[]) => void;
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({ 
  budget, 
  onBudgetChange 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {formatCurrency(budget.min)} - {formatCurrency(budget.max)}
        </span>
      </div>
      <Slider
        defaultValue={[budget.min, budget.max]}
        max={10000}
        step={100}
        onValueChange={onBudgetChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Budget</span>
        <span>Luxury</span>
      </div>
    </div>
  );
};

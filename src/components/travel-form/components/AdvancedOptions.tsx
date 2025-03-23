
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DateRangeSelector } from './DateRangeSelector';
import { BudgetSelector } from './BudgetSelector';
import { TripTypeSelector } from './TripTypeSelector';
import { AgeRangeSelector } from './AgeRangeSelector';
import { FamilyOptionsSelector } from './FamilyOptionsSelector';
import { DateRange, BudgetRange, TripType, FamilyOptions } from '@/types';

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  dateRange: DateRange;
  onDateChange: (dateRange: DateRange) => void;
  budget: BudgetRange;
  onBudgetChange: (values: number[]) => void;
  tripTypes: TripType[];
  onTripTypeChange: (id: string, checked: boolean) => void;
  ageRange: string;
  onAgeRangeChange: (value: string) => void;
  familyOptions: FamilyOptions;
  onFamilyOptionChange: (option: keyof FamilyOptions, value: boolean) => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  showAdvanced,
  onToggleAdvanced,
  dateRange,
  onDateChange,
  budget,
  onBudgetChange,
  tripTypes,
  onTripTypeChange,
  ageRange,
  onAgeRangeChange,
  familyOptions,
  onFamilyOptionChange
}) => {
  // Check if family trip type is selected
  const isFamilySelected = tripTypes.find(t => t.id === '1')?.selected;

  return (
    <>
      <div className="pt-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onToggleAdvanced}
        >
          <Settings className="mr-2 h-4 w-4" />
          {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
        </Button>
      </div>
      
      {showAdvanced && (
        <Accordion type="single" collapsible className="w-full">
          {/* Date Range */}
          <AccordionItem value="date-range">
            <AccordionTrigger>Travel Dates</AccordionTrigger>
            <AccordionContent>
              <DateRangeSelector dateRange={dateRange} onDateChange={onDateChange} />
            </AccordionContent>
          </AccordionItem>

          {/* Budget Slider */}
          <AccordionItem value="budget">
            <AccordionTrigger>Budget Range</AccordionTrigger>
            <AccordionContent>
              <BudgetSelector budget={budget} onBudgetChange={onBudgetChange} />
            </AccordionContent>
          </AccordionItem>
          
          {/* Trip Type */}
          <AccordionItem value="trip-type">
            <AccordionTrigger>Trip Type</AccordionTrigger>
            <AccordionContent>
              <TripTypeSelector tripTypes={tripTypes} onTripTypeChange={onTripTypeChange} />
            </AccordionContent>
          </AccordionItem>
          
          {/* Age Range */}
          <AccordionItem value="age-range">
            <AccordionTrigger>Age Range</AccordionTrigger>
            <AccordionContent>
              <AgeRangeSelector value={ageRange} onChange={onAgeRangeChange} />
            </AccordionContent>
          </AccordionItem>
          
          {/* Family Options - Only show if Family trip type is selected */}
          {isFamilySelected && (
            <AccordionItem value="family-options">
              <AccordionTrigger>Family Options</AccordionTrigger>
              <AccordionContent>
                <FamilyOptionsSelector 
                  options={familyOptions} 
                  onChange={onFamilyOptionChange} 
                />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}
    </>
  );
};

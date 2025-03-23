
import React, { useState } from 'react';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { ItineraryPreview } from '@/components/ItineraryPreview';
import { FormNavigation } from '@/components/FormSteps/FormNavigation';
import { TravelPreferencesProvider, useTravelPreferences } from '@/contexts/TravelPreferencesContext';
import { useFormNavigation, STEPS } from '@/hooks/useFormNavigation';
import { isOpenAIConfigured } from '@/utils/apiKeys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Users, UsersRound, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { DestinationStep } from '@/components/FormSteps/DestinationStep';
import { DateStep } from '@/components/FormSteps/DateStep';
import { InterestsStep } from '@/components/FormSteps/InterestsStep';
import { BudgetStep } from '@/components/FormSteps/BudgetStep';
import { AccommodationStep } from '@/components/FormSteps/AccommodationStep';
import { TransportationStep } from '@/components/FormSteps/TransportationStep';
import { ReviewStep } from '@/components/FormSteps/ReviewStep';

type TravelGroupType = 'solo' | 'family' | 'group' | null;
type FormStage = 'group' | 'destination' | 'dates' | 'preferences' | 'review';

const TravelFormContent: React.FC = () => {
  const { preferences, openaiApiKey } = useTravelPreferences();
  const [groupType, setGroupType] = useState<TravelGroupType>(null);
  const [stage, setStage] = useState<FormStage>('group');
  
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

  const handleGroupSelect = (type: TravelGroupType) => {
    setGroupType(type);
    setStage('destination');
  };

  const renderStage = () => {
    switch (stage) {
      case 'group':
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">I'm traveling as...</h2>
              <p className="text-muted-foreground">Tell us who you're traveling with</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-all" 
                onClick={() => handleGroupSelect('solo')}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">Solo Traveler</h3>
                <p className="text-sm text-muted-foreground mt-2">Just me, myself and I</p>
              </Card>
              
              <Card 
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-all" 
                onClick={() => handleGroupSelect('family')}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">Family</h3>
                <p className="text-sm text-muted-foreground mt-2">Traveling with family members</p>
              </Card>
              
              <Card 
                className="p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-all" 
                onClick={() => handleGroupSelect('group')}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UsersRound className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">Group</h3>
                <p className="text-sm text-muted-foreground mt-2">Traveling with friends or colleagues</p>
              </Card>
            </div>
          </div>
        );
      
      case 'destination':
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Where are you going?</h2>
              <p className="text-muted-foreground">Add your destinations</p>
            </div>
            <DestinationStep 
              destinations={preferences.destinations} 
              setDestinations={preferences.setDestinations} 
            />
            <div className="flex justify-end mt-6">
              <Button 
                onClick={() => setStage('dates')}
                disabled={preferences.destinations.length === 0}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'dates':
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">When are you traveling?</h2>
              <p className="text-muted-foreground">Select your dates</p>
            </div>
            <DateStep 
              dateRange={preferences.dateRange} 
              setDateRange={preferences.setDateRange} 
            />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStage('destination')}>
                Back
              </Button>
              <Button 
                onClick={() => setStage('preferences')}
                disabled={!preferences.dateRange.startDate || !preferences.dateRange.endDate}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'preferences':
        return (
          <div>
            <StepIndicator 
              steps={STEPS.slice(2, 6)} 
              currentStep={currentStep - 2} 
              onStepClick={index => goToStep(index + 2)}
              className="mb-8" 
            />
            
            <div className="mb-8">
              {currentStep === 2 && (
                <InterestsStep 
                  interests={preferences.interests} 
                  setInterests={preferences.setInterests} 
                />
              )}
              {currentStep === 3 && (
                <BudgetStep 
                  budget={preferences.budget} 
                  setBudget={preferences.setBudget} 
                />
              )}
              {currentStep === 4 && (
                <AccommodationStep 
                  accommodationTypes={preferences.accommodationTypes} 
                  setAccommodationTypes={preferences.setAccommodationTypes} 
                />
              )}
              {currentStep === 5 && (
                <TransportationStep 
                  transportationTypes={preferences.transportationTypes} 
                  setTransportationTypes={preferences.setTransportationTypes} 
                />
              )}
            </div>
            
            <div className="flex justify-between max-w-md mx-auto">
              {currentStep === 2 ? (
                <Button variant="outline" onClick={() => setStage('dates')}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={prevStep} disabled={isGenerating}>
                  Back
                </Button>
              )}
              
              {currentStep < 5 ? (
                <Button onClick={nextStep} disabled={isGenerating}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => setStage('review')} disabled={isGenerating}>
                  Review <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Review Your Trip</h2>
              <p className="text-muted-foreground">Make sure everything is right before we generate your itinerary</p>
            </div>
            <ReviewStep 
              preferences={preferences} 
              onApiKeyChange={preferences.setOpenaiApiKey}
              apiKeyConfigured={!!openaiApiKey}
            />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStage('preferences')} disabled={isGenerating}>
                Back
              </Button>
              <Button 
                onClick={handleGenerateItinerary}
                className="bg-primary hover:bg-primary/90"
                disabled={isGenerating || !(!!openaiApiKey || isOpenAIConfigured())}
              >
                Generate Itinerary
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
      {renderStage()}
      
      {!generatedItinerary && stage !== 'group' && (
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

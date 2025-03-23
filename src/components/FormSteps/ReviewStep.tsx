
import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { TravelPreferences } from '@/types';
import { format } from 'date-fns';
import { 
  MapPin, Calendar, Star, CreditCard, BedDouble, Plane, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ReviewStepProps {
  preferences: TravelPreferences;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  preferences,
}) => {
  const { 
    destinations, 
    dateRange,
    interests, 
    budget,
    accommodationTypes,
    transportationTypes 
  } = preferences;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const selectedInterests = interests.filter(interest => interest.selected);
  const selectedAccommodations = accommodationTypes.filter(type => type.selected);
  const selectedTransportations = transportationTypes.filter(type => type.selected);

  return (
    <AnimatedCard animation="slide" className="max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-1">Review your trip details</h3>
          <p className="text-muted-foreground text-sm">
            Check that everything looks right before generating your itinerary.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Destinations</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              {destinations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {destinations.map(destination => (
                    <Badge key={destination.id} variant="outline" className="bg-background/80">
                      {destination.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No destinations selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Travel Dates</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              {dateRange.startDate && dateRange.endDate ? (
                <p className="text-sm">
                  {format(dateRange.startDate, 'MMM d, yyyy')} - {format(dateRange.endDate, 'MMM d, yyyy')}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No dates selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Star className="h-4 w-4 text-primary" />
              <span>Interests</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              {selectedInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map(interest => (
                    <Badge key={interest.id} variant="outline" className="bg-background/80">
                      {interest.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No interests selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>Budget</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              <p className="text-sm">
                {formatCurrency(budget.min)} - {formatCurrency(budget.max)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BedDouble className="h-4 w-4 text-primary" />
              <span>Accommodation</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              {selectedAccommodations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedAccommodations.map(type => (
                    <Badge key={type.id} variant="outline" className="bg-background/80">
                      {type.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No accommodation types selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Plane className="h-4 w-4 text-primary" />
              <span>Transportation</span>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md">
              {selectedTransportations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedTransportations.map(type => (
                    <Badge key={type.id} variant="outline" className="bg-background/80">
                      {type.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No transportation types selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};


import React, { createContext, useContext, useState } from 'react';
import { getStoredApiKey } from '@/utils/openaiApi';
import { 
  TravelPreferences, 
  Destination, 
  DateRange, 
  Interest, 
  BudgetRange, 
  AccommodationType, 
  TransportationType
} from '@/types';

interface TravelPreferencesContextType {
  preferences: TravelPreferences;
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
  setDestinations: (destinations: Destination[]) => void;
  setDateRange: (dateRange: DateRange) => void;
  setInterests: (interests: Interest[]) => void;
  setBudget: (budget: BudgetRange) => void;
  setAccommodationTypes: (types: AccommodationType[]) => void;
  setTransportationTypes: (types: TransportationType[]) => void;
}

const defaultTravelPreferences: TravelPreferences = {
  destinations: [],
  dateRange: {
    startDate: null,
    endDate: null
  },
  interests: [
    { id: '1', name: 'Food & Drink', icon: 'Utensils', selected: false },
    { id: '2', name: 'Cultural', icon: 'Museum', selected: false },
    { id: '3', name: 'Adventure', icon: 'Mountain', selected: false },
    { id: '4', name: 'Nature', icon: 'TreePine', selected: false },
    { id: '5', name: 'Art', icon: 'Brush', selected: false },
    { id: '6', name: 'Beach', icon: 'Waves', selected: false },
    { id: '7', name: 'Entertainment', icon: 'Ticket', selected: false },
    { id: '8', name: 'Photography', icon: 'Camera', selected: false },
    { id: '9', name: 'Wine', icon: 'Wine', selected: false },
  ],
  budget: {
    min: 1000,
    max: 5000,
    currency: 'USD'
  },
  accommodationTypes: [
    { id: '1', name: 'Hotel', icon: 'Building2', selected: false },
    { id: '2', name: 'Apartment', icon: 'Home', selected: false },
    { id: '3', name: 'Resort', icon: 'Castle', selected: false },
    { id: '4', name: 'Cabin', icon: 'TreePine', selected: false },
    { id: '5', name: 'Hostel', icon: 'Users', selected: false },
    { id: '6', name: 'Camping', icon: 'Tent', selected: false },
  ],
  transportationTypes: [
    { id: '1', name: 'Flight', icon: 'Plane', selected: false },
    { id: '2', name: 'Train', icon: 'Train', selected: false },
    { id: '3', name: 'Car Rental', icon: 'Car', selected: false },
    { id: '4', name: 'Bus', icon: 'Bus', selected: false },
    { id: '5', name: 'Ferry', icon: 'Ship', selected: false },
    { id: '6', name: 'Walking', icon: 'Footprints', selected: false },
  ]
};

export const TravelPreferencesContext = createContext<TravelPreferencesContextType | undefined>(undefined);

export const TravelPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<TravelPreferences>(defaultTravelPreferences);
  const [openaiApiKey, setOpenaiApiKey] = useState(getStoredApiKey());

  const setDestinations = (destinations: Destination[]) => {
    setPreferences(prev => ({ ...prev, destinations }));
  };

  const setDateRange = (dateRange: DateRange) => {
    setPreferences(prev => ({ ...prev, dateRange }));
  };

  const setInterests = (interests: Interest[]) => {
    setPreferences(prev => ({ ...prev, interests }));
  };

  const setBudget = (budget: BudgetRange) => {
    setPreferences(prev => ({ ...prev, budget }));
  };

  const setAccommodationTypes = (accommodationTypes: AccommodationType[]) => {
    setPreferences(prev => ({ ...prev, accommodationTypes }));
  };

  const setTransportationTypes = (transportationTypes: TransportationType[]) => {
    setPreferences(prev => ({ ...prev, transportationTypes }));
  };

  return (
    <TravelPreferencesContext.Provider 
      value={{ 
        preferences, 
        openaiApiKey,
        setOpenaiApiKey,
        setDestinations,
        setDateRange,
        setInterests,
        setBudget,
        setAccommodationTypes,
        setTransportationTypes,
      }}
    >
      {children}
    </TravelPreferencesContext.Provider>
  );
};

export const useTravelPreferences = () => {
  const context = useContext(TravelPreferencesContext);
  if (!context) {
    throw new Error('useTravelPreferences must be used within a TravelPreferencesProvider');
  }
  return context;
};

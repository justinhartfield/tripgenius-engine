
export type Destination = {
  id: string;
  name: string;
};

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export type Interest = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

export type BudgetRange = {
  min: number;
  max: number;
  currency: string;
};

export type AccommodationType = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

export type TransportationType = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

export type TripMood = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

export type TripType = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
};

export type FamilyOptions = {
  hasPool: boolean;
  hasConnectedBeds: boolean;
  hasPlayground: boolean;
  isChildFriendly: boolean;
};

export type TravelPreferences = {
  destinations: Destination[];
  dateRange: DateRange;
  interests: Interest[];
  budget: BudgetRange;
  accommodationTypes: AccommodationType[];
  transportationTypes: TransportationType[];
  mood: TripMood[];
  tripTypes: TripType[];
  ageRange: string;
  familyOptions: FamilyOptions;
};

export type FormStep = {
  id: string;
  title: string;
  description: string;
};

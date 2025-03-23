
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

export type TravelPreferences = {
  destinations: Destination[];
  dateRange: DateRange;
  interests: Interest[];
  budget: BudgetRange;
  accommodationTypes: AccommodationType[];
  transportationTypes: TransportationType[];
};

export type FormStep = {
  id: string;
  title: string;
  description: string;
};

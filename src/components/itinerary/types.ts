
export interface Activity {
  time: string;
  activity: string;
  interest: string;
}

export interface DayData {
  date: Date;
  activities: Activity[];
}

export interface PreviewDayProps {
  day: DayData;
  dayIndex: number;
  destinationImages?: Record<string, string>;
  tourGuideType?: string;
}

export interface ActivitySectionProps {
  activities: Activity[];
  icon: React.ReactNode;
  title: string;
  titleColor: string;
  borderColor: string;
  dayIndex: number;
  startIndex: number;
  tourGuideType?: string;
  thumbnailFn?: () => string | undefined;
}

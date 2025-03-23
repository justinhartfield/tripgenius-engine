
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AgeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select age range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All ages</SelectItem>
        <SelectItem value="children">With young children (0-12)</SelectItem>
        <SelectItem value="teens">With teenagers (13-17)</SelectItem>
        <SelectItem value="young-adults">Young adults (18-30)</SelectItem>
        <SelectItem value="adults">Adults (30-60)</SelectItem>
        <SelectItem value="seniors">Seniors (60+)</SelectItem>
      </SelectContent>
    </Select>
  );
};

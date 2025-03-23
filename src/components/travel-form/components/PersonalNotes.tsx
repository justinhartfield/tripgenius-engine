
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface PersonalNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tell us what's unique about you or your trip</label>
      <Textarea
        placeholder="E.g., I'm traveling with my elderly parents, I love art museums, I want to see live music, etc."
        value={value}
        onChange={handleChange}
        className="min-h-[100px]"
      />
    </div>
  );
};

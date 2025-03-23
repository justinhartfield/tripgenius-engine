
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { FamilyOptions } from '@/types';

interface FamilyOptionsSelectorProps {
  options: FamilyOptions;
  onChange: (option: keyof FamilyOptions, value: boolean) => void;
}

export const FamilyOptionsSelector: React.FC<FamilyOptionsSelectorProps> = ({ 
  options, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch 
          id="has-pool" 
          checked={options.hasPool}
          onCheckedChange={(checked) => 
            onChange('hasPool', checked)
          }
        />
        <label htmlFor="has-pool">Accommodation with pool</label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="has-connected-beds" 
          checked={options.hasConnectedBeds}
          onCheckedChange={(checked) => 
            onChange('hasConnectedBeds', checked)
          }
        />
        <label htmlFor="has-connected-beds">Connected/adjoining rooms</label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="has-playground" 
          checked={options.hasPlayground}
          onCheckedChange={(checked) => 
            onChange('hasPlayground', checked)
          }
        />
        <label htmlFor="has-playground">Kid-friendly activities/playground</label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="is-child-friendly" 
          checked={options.isChildFriendly}
          onCheckedChange={(checked) => 
            onChange('isChildFriendly', checked)
          }
        />
        <label htmlFor="is-child-friendly">Child-friendly restaurants</label>
      </div>
    </div>
  );
};

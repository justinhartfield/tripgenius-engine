
import { Coffee, Utensils, Camera, Map, Brush, Waves, Ticket, TreePine, Wine, Mountain } from 'lucide-react';
import React from 'react';

/**
 * Returns the appropriate icon component based on the icon name
 */
export const getIconComponent = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case 'Utensils': 
      return React.createElement(Utensils, { className: "h-5 w-5" });
    case 'Map': 
      return React.createElement(Map, { className: "h-5 w-5" });
    case 'Camera': 
      return React.createElement(Camera, { className: "h-5 w-5" });
    case 'Mountain': 
      return React.createElement(Mountain, { className: "h-5 w-5" });
    case 'TreePine': 
      return React.createElement(TreePine, { className: "h-5 w-5" });
    case 'Brush': 
      return React.createElement(Brush, { className: "h-5 w-5" });
    case 'Waves': 
      return React.createElement(Waves, { className: "h-5 w-5" });
    case 'Ticket': 
      return React.createElement(Ticket, { className: "h-5 w-5" });
    case 'Wine': 
      return React.createElement(Wine, { className: "h-5 w-5" });
    default: 
      return React.createElement(Coffee, { className: "h-5 w-5" });
  }
};

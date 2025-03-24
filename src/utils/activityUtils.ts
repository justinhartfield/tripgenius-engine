
import { Coffee, Utensils, Camera, Map, Brush, Waves, Ticket, TreePine, Wine, Mountain } from 'lucide-react';
import React from 'react';

/**
 * Formats activity text by cleaning up HTML or markdown artifacts
 */
export const formatActivityText = (text: string): string => {
  return text
    .replace(/\\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\n\n###/g, '\n###')
    .replace(/\n\n##/g, '\n##')
    .replace(/\n\n#/g, '\n#')
    .replace(/\*\*/g, '')
    .replace(/\\\*/g, '*')
    .replace(/\\/g, '')
    .replace(/\n###\s?/g, '\n')
    .replace(/\n##\s?/g, '\n')
    .replace(/\n#\s?/g, '\n')
    .replace(/\|\n\|/g, '\n');
};

/**
 * Converts plain text location names to hyperlinks
 */
export const addHyperlinksToActivityText = (text: string): string => {
  if (!text) return '';
  
  // Pattern to match names of establishments with various formats
  // This regex looks for patterns like "Name of Place", "The Name", "Place Name Restaurant", etc.
  const patterns = [
    // Match quoted venue names
    /"([^"]+)"/g,
    // Match venue names followed by common venue types
    /([A-Z][A-Za-z0-9\s]{2,})\s(Hotel|Restaurant|Café|Bistro|Museum|Gallery|Park|Garden|Castle|Palace|Cathedral|Church)/g,
    // Match venue types followed by name
    /(Hotel|Restaurant|Café|Bistro|Museum|Gallery|Park|Garden|Castle|Palace|Cathedral|Church)\s([A-Z][A-Za-z0-9\s]{2,})/g,
    // Match "The" followed by a name
    /The\s([A-Z][A-Za-z0-9\s]{2,})/g
  ];
  
  let processedText = text;
  
  patterns.forEach(pattern => {
    processedText = processedText.replace(pattern, (match, p1, p2) => {
      const venueName = p2 ? `${p1} ${p2}` : p1;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(venueName)}`;
      return `<a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${match}</a>`;
    });
  });
  
  return processedText;
};

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

/**
 * Determines card and bubble colors based on time of day
 */
export const getTimeOfDayColor = (time: string): string => {
  // Check for time of day keywords first
  const timeStr = time.toLowerCase();
  if (timeStr.includes('morning') || timeStr.includes('breakfast')) {
    return 'bg-orange-100 border-orange-200';
  } else if (timeStr.includes('afternoon') || timeStr.includes('lunch')) {
    return 'bg-green-100 border-green-200';
  } else if (timeStr.includes('evening') || timeStr.includes('dinner') || timeStr.includes('night')) {
    return 'bg-purple-100 border-purple-200';
  }
  
  // Parse the time string to determine if it's morning, afternoon, or evening
  const hourMatch = time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    // Morning: 5am - 11:59am (orange)
    if (hour >= 5 && hour < 12) {
      return 'bg-orange-100 border-orange-200';
    }
    // Afternoon: 12pm - 5:59pm (green)
    else if (hour >= 12 && hour < 18) {
      return 'bg-green-100 border-green-200';
    }
    // Evening: 6pm - 4:59am (purple)
    else {
      return 'bg-purple-100 border-purple-200';
    }
  }
  
  // Default color if time format is not recognized
  return 'bg-gray-100 border-gray-200';
};

/**
 * Returns the tag color based on interest type
 */
export const getTagColor = (interest: string): string => {
  switch (interest.toLowerCase()) {
    case 'food': return 'bg-orange-500/20 text-orange-700';
    case 'sightseeing': return 'bg-blue-500/20 text-blue-700';
    case 'adventure': return 'bg-green-500/20 text-green-700';
    case 'culture': return 'bg-purple-500/20 text-purple-700';
    case 'relaxation': return 'bg-teal-500/20 text-teal-700';
    case 'shopping': return 'bg-pink-500/20 text-pink-700';
    case 'nightlife': return 'bg-indigo-500/20 text-indigo-700';
    default: return 'bg-primary/20 text-primary';
  }
};

/**
 * Format the time for display
 */
export const formatTimeDisplay = (time: string): string => {
  // If it's a standalone number, format it with proper time display
  if (/^\d+$/.test(time.trim())) {
    const hour = parseInt(time.trim());
    return hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
  }
  
  // Check if it's just a word like "Morning", "Afternoon", etc.
  const timeWords = ["morning", "afternoon", "evening", "night", "breakfast", "lunch", "dinner"];
  if (timeWords.some(word => time.toLowerCase() === word)) {
    return time.charAt(0).toUpperCase() + time.slice(1);
  }
  
  return time;
};

/**
 * Determines time of day label
 */
export const getTimeOfDayLabel = (time: string): string => {
  // Check for time of day keywords first
  const timeStr = time.toLowerCase();
  if (timeStr.includes('morning') || timeStr.includes('breakfast')) {
    return "Morning";
  } else if (timeStr.includes('afternoon') || timeStr.includes('lunch')) {
    return "Afternoon";
  } else if (timeStr.includes('evening') || timeStr.includes('dinner') || timeStr.includes('night')) {
    return "Evening";
  }
  
  const hourMatch = time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i);
  
  if (hourMatch) {
    let hour = parseInt(hourMatch[1]);
    const ampm = hourMatch[3]?.toLowerCase();
    
    // Convert to 24-hour format for comparison
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    
    if (hour >= 5 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }
  
  // Default to empty string if we can't determine
  return "";
};

/**
 * Get icon background color based on time of day
 */
export const getIconBgColor = (time: string): string => {
  const timeOfDay = getTimeOfDayLabel(time);
  
  switch (timeOfDay) {
    case "Morning": return "bg-orange-200 text-orange-700";
    case "Afternoon": return "bg-green-200 text-green-700";
    case "Evening": return "bg-purple-200 text-purple-700";
    default: return "bg-primary/20 text-primary-foreground";
  }
};

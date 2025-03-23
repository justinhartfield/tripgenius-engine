
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  className?: string;
}

export const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Add a destination...",
  className
}) => {
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Google Maps API is available
    const googleApiKey = localStorage.getItem('google_api_key');
    if (!googleApiKey || !window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    autocompleteService.current = new google.maps.places.AutocompleteService();
    
    // Create a dummy element for the PlacesService (it requires a DOM element)
    const dummyElement = document.createElement('div');
    placesService.current = new google.maps.places.PlacesService(dummyElement);
    
    // Add click outside listener to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    
    if (value.length > 1 && autocompleteService.current) {
      setLoading(true);
      setShowDropdown(true);
      
      autocompleteService.current.getPlacePredictions(
        { input: value, types: ['(cities)'] },
        (predictions, status) => {
          setLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
      setShowDropdown(false);
    }
  };

  const handleSelectPlace = (prediction: google.maps.places.AutocompletePrediction) => {
    if (!placesService.current) return;
    
    placesService.current.getDetails(
      { placeId: prediction.place_id },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          onChange(prediction.description);
          if (onPlaceSelect) {
            onPlaceSelect(place);
          }
        }
      }
    );
    
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length > 1 && setPredictions.length > 0 && setShowDropdown(true)}
          className={className}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </div>
      </div>
      
      {showDropdown && predictions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
        >
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSelectPlace(prediction)}
            >
              <MapPin className="h-4 w-4 mr-2 text-primary opacity-70" />
              <span>{prediction.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

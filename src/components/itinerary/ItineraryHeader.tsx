
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiSettingsDialog } from './ApiSettingsDialog';

interface ItineraryHeaderProps {
  googleApiKey: string;
  searchEngineId: string;
  setGoogleApiKey: (value: string) => void;
  setSearchEngineId: (value: string) => void;
  saveApiKeys: () => void;
  handleShare: () => void;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({
  googleApiKey,
  searchEngineId,
  setGoogleApiKey,
  setSearchEngineId,
  saveApiKeys,
  handleShare
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Link to="/">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Planner
        </Button>
      </Link>
      <div className="flex gap-2">
        <ApiSettingsDialog
          googleApiKey={googleApiKey}
          searchEngineId={searchEngineId}
          setGoogleApiKey={setGoogleApiKey}
          setSearchEngineId={setSearchEngineId}
          saveApiKeys={saveApiKeys}
        />
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" /> Share Itinerary
        </Button>
      </div>
    </div>
  );
};

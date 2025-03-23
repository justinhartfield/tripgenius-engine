
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ApiSettingsDialog } from './ApiSettingsDialog';
import { CalendarExport } from './CalendarExport';
import { Share2, FileText } from 'lucide-react';

interface ItineraryHeaderProps {
  googleApiKey: string;
  searchEngineId: string;
  setGoogleApiKey: (value: string) => void;
  setSearchEngineId: (value: string) => void;
  saveApiKeys: () => void;
  handleShare: () => void;
  onBrowsePlans?: () => void;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({
  googleApiKey,
  searchEngineId,
  setGoogleApiKey,
  setSearchEngineId,
  saveApiKeys,
  handleShare,
  onBrowsePlans
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Personalized Itinerary</h1>
        <div className="flex flex-wrap gap-2">
          {onBrowsePlans && (
            <Button variant="outline" onClick={onBrowsePlans}>
              <FileText className="mr-2 h-4 w-4" />
              Browse Plans
            </Button>
          )}
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <CalendarExport />
          <ApiSettingsDialog
            googleApiKey={googleApiKey}
            searchEngineId={searchEngineId}
            setGoogleApiKey={setGoogleApiKey}
            setSearchEngineId={setSearchEngineId}
            saveApiKeys={saveApiKeys}
          />
        </div>
      </div>
      <Separator />
    </div>
  );
};

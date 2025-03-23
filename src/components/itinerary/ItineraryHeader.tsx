
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ApiSettingsDialog } from './ApiSettingsDialog';
import { CalendarExport } from './CalendarExport';
import { Share2, FileText, Copy, Calendar, Download } from 'lucide-react';

interface ItineraryHeaderProps {
  googleApiKey: string;
  searchEngineId: string;
  setGoogleApiKey: (value: string) => void;
  setSearchEngineId: (value: string) => void;
  saveApiKeys: () => void;
  handleShare: () => void;
  onBrowsePlans?: () => void;
  itineraryContent?: string;
  onCopyText?: () => void;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({
  googleApiKey,
  searchEngineId,
  setGoogleApiKey,
  setSearchEngineId,
  saveApiKeys,
  handleShare,
  onBrowsePlans,
  itineraryContent,
  onCopyText
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Personalized Itinerary</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {onBrowsePlans && (
            <Button variant="outline" onClick={onBrowsePlans} className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Browse Plans
            </Button>
          )}
          <Button variant="outline" onClick={handleShare} className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {itineraryContent && (
            <>
              <CalendarExport itinerary={itineraryContent} contentRef={null} />
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Apple Calendar
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Print/Save PDF
              </Button>
              {onCopyText && (
                <Button variant="outline" onClick={onCopyText} className="flex items-center">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-start mb-4">
        <ApiSettingsDialog
          googleApiKey={googleApiKey}
          searchEngineId={searchEngineId}
          setGoogleApiKey={setGoogleApiKey}
          setSearchEngineId={setSearchEngineId}
          saveApiKeys={saveApiKeys}
        />
      </div>
      
      <Separator />
    </div>
  );
};

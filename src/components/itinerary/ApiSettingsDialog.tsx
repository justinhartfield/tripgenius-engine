
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApiSettingsDialogProps {
  googleApiKey: string;
  searchEngineId: string;
  setGoogleApiKey: (value: string) => void;
  setSearchEngineId: (value: string) => void;
  saveApiKeys: () => void;
}

export const ApiSettingsDialog: React.FC<ApiSettingsDialogProps> = ({
  googleApiKey,
  searchEngineId,
  setGoogleApiKey,
  setSearchEngineId,
  saveApiKeys
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> API Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys for enhanced features
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="google-api-key">Google API Key</Label>
            <Input
              id="google-api-key"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              placeholder="Enter your Google API Key"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-engine-id">Google Custom Search Engine ID</Label>
            <Input
              id="search-engine-id"
              value={searchEngineId}
              onChange={(e) => setSearchEngineId(e.target.value)}
              placeholder="Enter your Search Engine ID"
            />
          </div>
          <Button onClick={saveApiKeys}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

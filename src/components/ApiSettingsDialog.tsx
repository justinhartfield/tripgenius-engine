
import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ApiSettingsDialog: React.FC = () => {
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [searchEngineId, setSearchEngineId] = useState('');
  
  // Load saved keys on component mount
  useEffect(() => {
    const savedGoogleKey = localStorage.getItem('google_api_key') || '';
    const savedOpenaiKey = localStorage.getItem('openai_api_key') || '';
    const savedSearchEngineId = localStorage.getItem('google_search_engine_id') || '';
    
    setGoogleApiKey(savedGoogleKey);
    setOpenaiApiKey(savedOpenaiKey);
    setSearchEngineId(savedSearchEngineId);
  }, []);
  
  const saveApiKeys = () => {
    // Save Google API key
    if (googleApiKey.trim()) {
      localStorage.setItem('google_api_key', googleApiKey.trim());
    }
    
    // Save OpenAI API key
    if (openaiApiKey.trim()) {
      localStorage.setItem('openai_api_key', openaiApiKey.trim());
    }
    
    // Save Search Engine ID
    if (searchEngineId.trim()) {
      localStorage.setItem('google_search_engine_id', searchEngineId.trim());
    }
    
    // Reload Google Maps API if needed
    if (googleApiKey.trim() && (!window.google || !window.google.maps)) {
      loadGoogleMapsApi(googleApiKey.trim());
    }
    
    toast.success('API settings saved successfully');
  };
  
  const loadGoogleMapsApi = (apiKey: string) => {
    try {
      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded successfully');
        toast.success('Google Maps API loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        toast.error('Failed to load Google Maps API. Place autocomplete may not work.');
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              Used for location autocomplete and destination images
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="search-engine-id">Google Custom Search Engine ID</Label>
            <Input
              id="search-engine-id"
              value={searchEngineId}
              onChange={(e) => setSearchEngineId(e.target.value)}
              placeholder="Enter your Search Engine ID"
            />
            <p className="text-xs text-muted-foreground">
              Required for destination images
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="openai-api-key">OpenAI API Key</Label>
            <Input
              id="openai-api-key"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
              placeholder="Enter your OpenAI API Key"
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              Required for generating travel itineraries
            </p>
          </div>
          
          <Button onClick={saveApiKeys} className="w-full">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

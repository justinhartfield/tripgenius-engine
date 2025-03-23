
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, MapPin, Image } from 'lucide-react';
import { getAllApiKeys, saveApiKeys, isOpenAIConfigured, isGoogleMapsConfigured, isGoogleSearchConfigured } from '@/utils/apiKeys';

interface ApiKeyManagerProps {
  onApiKeysChange?: (keys: { type: string, value: string }) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeysChange }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("openai");
  const [apiKeys, setApiKeys] = useState({
    openaiApiKey: '',
    googleMapsApiKey: '',
    googleSearchEngineId: ''
  });
  
  useEffect(() => {
    // Load existing keys
    const keys = getAllApiKeys();
    setApiKeys({
      openaiApiKey: keys.openaiApiKey || '',
      googleMapsApiKey: keys.googleMapsApiKey || '',
      googleSearchEngineId: keys.googleSearchEngineId || ''
    });
  }, [open]);
  
  const handleSave = () => {
    saveApiKeys(apiKeys);
    if (onApiKeysChange && activeTab === "openai") {
      onApiKeysChange({ type: 'openai', value: apiKeys.openaiApiKey });
    }
    setOpen(false);
  };
  
  // Status indicators
  const openaiStatus = isOpenAIConfigured();
  const googleMapsStatus = isGoogleMapsConfigured();
  const googleSearchStatus = isGoogleSearchConfigured();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key Settings</DialogTitle>
          <DialogDescription>
            Configure API keys for different services used by this application.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="openai" value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="openai" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>OpenAI</span>
              {openaiStatus && <span className="w-2 h-2 bg-green-500 rounded-full ml-1"></span>}
            </TabsTrigger>
            <TabsTrigger value="google" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Google APIs</span>
              {googleSearchStatus && <span className="w-2 h-2 bg-green-500 rounded-full ml-1"></span>}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API Key</label>
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKeys.openaiApiKey}
                onChange={(e) => setApiKeys({...apiKeys, openaiApiKey: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Required for itinerary generation. Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a>.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="google" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Google Maps API Key</label>
              <Input
                type="password" 
                placeholder="AIza..."
                value={apiKeys.googleMapsApiKey}
                onChange={(e) => setApiKeys({...apiKeys, googleMapsApiKey: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Used for maps integration. Get your key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Google Custom Search Engine ID</label>
              <Input
                placeholder="0123456789abcdef0"
                value={apiKeys.googleSearchEngineId}
                onChange={(e) => setApiKeys({...apiKeys, googleSearchEngineId: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Used for destination images. Create at <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Programmable Search Engine</a>.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

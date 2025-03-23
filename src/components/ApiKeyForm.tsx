
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key } from 'lucide-react';
import { getOpenAIApiKey, saveApiKeys, isOpenAIConfigured } from '@/utils/apiKeys';

interface ApiKeyFormProps {
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = getOpenAIApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      onApiKeyChange(storedKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    saveApiKeys({ openaiApiKey: apiKey });
    onApiKeyChange(apiKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          {isOpenAIConfigured() ? 'API Key Configured' : 'Set OpenAI API Key'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable itinerary generation.
            This key will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your API key is stored locally in your browser and is never sent to our servers.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveApiKey} disabled={!apiKey || apiKey.length < 10}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

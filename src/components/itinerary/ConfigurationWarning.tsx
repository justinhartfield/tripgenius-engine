
import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConfigurationWarning: React.FC = () => {
  const openGoogleCloudConsole = () => {
    window.open('https://console.cloud.google.com/apis/library/customsearch.googleapis.com', '_blank');
  };
  
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-amber-800 mb-1">API Enablement Required</h4>
        <p className="text-amber-700 text-sm mb-3">
          The Google Custom Search API needs to be <strong>enabled</strong> in your Google Cloud project. This is different from OAuth scopes - you need to activate the actual API service.
        </p>
        <ol className="text-amber-700 text-sm space-y-1 mb-3 pl-5 list-decimal">
          <li>Go to the Google Cloud Console API Library</li>
          <li>Search for "Custom Search API"</li>
          <li>Click "Enable" to activate the API for your project</li>
          <li>Make sure the API key you're using is associated with this project</li>
        </ol>
        <Button
          variant="outline"
          size="sm"
          onClick={openGoogleCloudConsole}
          className="border-amber-500 text-amber-700 hover:bg-amber-100"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Enable Custom Search API
        </Button>
      </div>
    </div>
  );
};

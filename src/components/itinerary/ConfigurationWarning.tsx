
import React from 'react';
import { AlertTriangle, ExternalLink, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConfigurationWarning: React.FC = () => {
  const openGoogleCloudConsole = () => {
    window.open('https://console.cloud.google.com/apis/library/customsearch.googleapis.com', '_blank');
  };
  
  const openCustomSearchConsole = () => {
    window.open('https://programmablesearchengine.google.com/controlpanel/all', '_blank');
  };
  
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-blue-800 mb-1">API Configuration Checklist</h4>
        <p className="text-blue-700 text-sm mb-3">
          Your API seems to be enabled, but if you're still experiencing issues with destination images, verify these settings:
        </p>
        <ul className="text-blue-700 text-sm space-y-2 mb-3 pl-1">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Custom Search API is enabled in Google Cloud Console</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>Verify your API key has access to the Custom Search API and has no restrictions</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>Confirm your Custom Search Engine is configured to search the entire web</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <span>Check that your Custom Search Engine has "Image search" option enabled</span>
          </li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={openGoogleCloudConsole}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Check API Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openCustomSearchConsole}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Check Search Engine
          </Button>
        </div>
      </div>
    </div>
  );
};

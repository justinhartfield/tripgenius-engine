
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ConfigurationWarning: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-amber-800 mb-1">API Configuration Required</h4>
        <p className="text-amber-700 text-sm">
          Google API configuration is needed for maps and destination images. Click on "API Settings" 
          in the top right corner to configure your keys. Make sure your Google API key has the 
          Custom Search API enabled in the Google Cloud Console.
        </p>
      </div>
    </div>
  );
};

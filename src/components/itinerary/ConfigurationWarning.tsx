
import React from 'react';

export const ConfigurationWarning: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
      <p className="text-amber-800 text-sm">
        Google API configuration required for maps and images. Click on API Settings to configure.
      </p>
    </div>
  );
};

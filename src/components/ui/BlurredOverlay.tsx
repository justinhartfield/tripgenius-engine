
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurredOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blurStrength?: 'light' | 'medium' | 'strong';
  bgOpacity?: 'light' | 'medium' | 'heavy';
}

export const BlurredOverlay: React.FC<BlurredOverlayProps> = ({
  children,
  className,
  blurStrength = 'medium',
  bgOpacity = 'medium',
  ...props
}) => {
  const getBlurClasses = () => {
    switch (blurStrength) {
      case 'light':
        return 'backdrop-blur-sm';
      case 'strong':
        return 'backdrop-blur-xl';
      default:
        return 'backdrop-blur-md';
    }
  };

  const getBgOpacityClasses = () => {
    switch (bgOpacity) {
      case 'light':
        return 'bg-white/30 dark:bg-black/30';
      case 'heavy':
        return 'bg-white/70 dark:bg-black/70';
      default:
        return 'bg-white/50 dark:bg-black/50';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-white/20 dark:border-gray-800/30 shadow-glass transition-all duration-300',
        getBlurClasses(),
        getBgOpacityClasses(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

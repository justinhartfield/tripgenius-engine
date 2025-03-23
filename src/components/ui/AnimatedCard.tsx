
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline' | 'subtle';
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  variant = 'default',
  animation = 'fade',
  delay = 0,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass-card';
      case 'outline':
        return 'bg-transparent border border-border';
      case 'subtle':
        return 'bg-muted/50';
      default:
        return 'bg-card text-card-foreground shadow-elevation-2';
    }
  };

  const getAnimationClasses = () => {
    const delayClass = delay > 0 ? `delay-${delay * 100}` : '';
    
    switch (animation) {
      case 'fade':
        return `animate-fade-in ${delayClass}`;
      case 'slide':
        return `animate-slide-up ${delayClass}`;
      case 'scale':
        return `animate-scale-in ${delayClass}`;
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all duration-300',
        getVariantClasses(),
        getAnimationClasses(),
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
      {...props}
    >
      {children}
    </div>
  );
};

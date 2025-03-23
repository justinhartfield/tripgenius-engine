
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
        return 'bg-white/90 backdrop-blur-sm border border-gray-200/80';
      case 'outline':
        return 'bg-transparent border border-gray-200';
      case 'subtle':
        return 'bg-gray-50';
      default:
        return 'bg-white text-gray-900 shadow-sm border border-gray-200';
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

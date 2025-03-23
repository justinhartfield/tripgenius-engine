
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BlurredOverlay } from '@/components/ui/BlurredOverlay';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted
}) => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-32 w-32 rounded-full bg-blue-200/60 blur-3xl animate-float" style={{
          animationDelay: '0s'
        }}></div>
        <div className="absolute left-[60%] top-[10%] h-40 w-40 rounded-full bg-blue-300/50 blur-3xl animate-float" style={{
          animationDelay: '1s'
        }}></div>
        <div className="absolute left-[30%] bottom-[20%] h-36 w-36 rounded-full bg-blue-200/40 blur-3xl animate-float" style={{
          animationDelay: '2s'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6 animate-fade-in">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>AI-Powered Travel Planning</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl animate-fade-in text-gray-900" style={{
          animationDelay: '0.1s'
        }}>
          <span className="block">Create your dream trip with</span>
          <span className="text-blue-600">TripGenius</span>
        </h1>
        
        <p className="mt-6 text-lg text-gray-600 max-w-xl animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
          Effortlessly plan personalized itineraries tailored to your preferences. 
          Let AI craft the perfect travel experience just for you.
        </p>
        
        <div className="mt-10 animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
          <Button onClick={onGetStarted} size="lg" className="px-8 py-6 rounded-full text-md transition-all duration-300 bg-blue-600 hover:bg-blue-700">
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

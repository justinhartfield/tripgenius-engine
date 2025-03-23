
import React from 'react';
import { ArrowRight, MapPin, Calendar, Users, User, UsersRound } from 'lucide-react';
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
        <div className="absolute -left-[10%] top-[20%] h-32 w-32 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute left-[60%] top-[10%] h-40 w-40 rounded-full bg-blue-400/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-[30%] bottom-[20%] h-36 w-36 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 animate-fade-in">
          <span>Your personalized travel planner</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="block">Plan your perfect trip with</span>
          <span className="text-primary">TripGenius</span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Tell us who you are, where you're going, and when - and we'll create 
          a personalized itinerary just for you.
        </p>
        
        <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="px-8 py-6 rounded-full text-md transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            <span>Start Planning</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
          {[
            { icon: User, title: 'I\'m a solo traveler', description: 'Solo adventures tailored for you' },
            { icon: Users, title: 'We\'re a family', description: 'Fun for everyone, big and small' },
            { icon: UsersRound, title: 'We\'re a group', description: 'Perfect activities for your crew' },
          ].map((feature, i) => (
            <BlurredOverlay
              key={i}
              className="p-5 flex flex-col items-center text-center animate-scale-in hover:bg-primary/5 cursor-pointer transition-all"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </BlurredOverlay>
          ))}
        </div>
      </div>
    </section>
  );
};

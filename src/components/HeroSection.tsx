import React from 'react';
import { ArrowRight, MapPin, Calendar, Sparkles, CreditCard, Ship, Music } from 'lucide-react';
import { BlurredOverlay } from '@/components/ui/BlurredOverlay';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
interface HeroSectionProps {
  onGetStarted: () => void;
}
export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted
}) => {
  return <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-32 w-32 rounded-full bg-primary/20 blur-3xl animate-float" style={{
        animationDelay: '0s'
      }}></div>
        <div className="absolute left-[60%] top-[10%] h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute left-[30%] bottom-[20%] h-36 w-36 rounded-full bg-primary/10 blur-3xl animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 animate-fade-in">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>AI-Powered Travel Planning</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl animate-fade-in" style={{
        animationDelay: '0.1s'
      }}>
          <span className="block">Create your dream trip with</span>
          <span className="text-primary">TripGenius</span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          Effortlessly plan personalized itineraries tailored to your preferences. 
          Let AI craft the perfect travel experience just for you.
        </p>
        
        <div className="mt-10 animate-fade-in" style={{
        animationDelay: '0.3s'
      }}>
          <Button onClick={onGetStarted} size="lg" className="px-8 py-6 rounded-full text-md transition-all duration-300 bg-primary hover:bg-primary/90">
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="Create a styled grid container with dynamic column count and spacing:\n- Use Tailwind CSS for styling\n- Use Grid component from shadcn/ui\n- Props: columns, max-width (number, default 4)\n- On small screens (max-width 640px): 1 column, full width\n- On medium screens (max-width 1024px): 2 columns\n- On larger screens: 4 columns\n- Use gap-4 for spacing and mt-16 for top margin\n- Set maximum width to 3xl on larger screens\n- Accept max-width and width props for customization">
          {[{
          icon: MapPin,
          title: 'Destinations',
          description: 'Choose from anywhere in the world'
        }, {
          icon: Calendar,
          title: 'Travel Dates',
          description: 'Plan for any time period'
        }, {
          icon: Sparkles,
          title: 'AI Powered',
          description: 'Tailored to your interests'
        }, {
          icon: Ship,
          title: 'Complete Plan',
          description: 'All details taken care of'
        }].map((feature, i) => <BlurredOverlay key={i} className="p-4 flex flex-col items-center text-center animate-scale-in glass-card" style={{
          animationDelay: `${0.4 + i * 0.1}s`
        }}>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </BlurredOverlay>)}
        </div>
      </div>
    </section>;
};
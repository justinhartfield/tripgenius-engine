
import React, { useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TravelForm } from '@/components/TravelForm';
import { ExampleItineraries } from '@/components/ExampleItineraries';

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={scrollToForm} />
      
      <ExampleItineraries />
      
      <div ref={formRef} className="py-12">
        <TravelForm />
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-background to-black/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                title: "Describe Your Trip",
                description: "Tell us where you want to go, when you're traveling, and what you're interested in."
              },
              {
                number: 2,
                title: "AI Creates Your Itinerary",
                description: "Our AI technology analyzes your preferences and generates a personalized day-by-day travel plan."
              },
              {
                number: 3,
                title: "Enjoy Your Journey",
                description: "Review your custom itinerary, save it, or share it with your travel companions."
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center glass-card p-8 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

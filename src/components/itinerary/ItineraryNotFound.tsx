
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ItineraryNotFound: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Planner
        </Button>
      </Link>
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Itinerary Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the itinerary you're looking for. Please return to the trip planner to create a new itinerary.
        </p>
        <Link to="/">
          <Button>Create New Itinerary</Button>
        </Link>
      </div>
    </div>
  );
};

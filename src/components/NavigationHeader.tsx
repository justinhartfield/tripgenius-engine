
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Map, PlusCircle } from 'lucide-react';

export const NavigationHeader: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">Travel Planner</Link>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant={location.pathname === '/' ? 'default' : 'ghost'} size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/plans">
            <Button variant={location.pathname === '/plans' ? 'default' : 'ghost'} size="sm">
              <Map className="h-4 w-4 mr-2" />
              Browse Plans
            </Button>
          </Link>
          {location.pathname === '/plans' && (
            <Link to="/">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

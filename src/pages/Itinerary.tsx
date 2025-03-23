
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchItinerary } from '@/utils/openaiApi';
import { ItineraryHeader } from '@/components/itinerary/ItineraryHeader';
import { ItinerarySection } from '@/components/itinerary/ItinerarySection';
import { TravelPreferences } from '@/types';
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { generateShareableLink } from '@/utils/linkGenerator';
import { saveItinerary } from '@/utils/supabase';

interface LocationState {
  itineraryData?: any;
  preferences?: TravelPreferences;
}

const ItineraryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [itineraryData, setItineraryData] = useState<any>(location.state?.itineraryData || null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState(localStorage.getItem('google_api_key') || '');
  const [searchEngineId, setSearchEngineId] = useState(localStorage.getItem('google_search_engine_id') || '');
  const [preferences, setPreferences] = useState<TravelPreferences>(location.state?.preferences || null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Save API keys to localStorage
  const saveApiKeys = () => {
    if (googleApiKey) {
      localStorage.setItem('google_api_key', googleApiKey);
    }
    if (searchEngineId) {
      localStorage.setItem('google_search_engine_id', searchEngineId);
    }
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been successfully saved.",
    });
  };

  useEffect(() => {
    const fetchItineraryData = async () => {
      if (slug) {
        setLoading(true);
        try {
          const storedApiKey = localStorage.getItem('openai_api_key');
          if (!storedApiKey) {
            toast({
              title: "API Key Required",
              description: "Please set your OpenAI API key in the settings before generating an itinerary.",
              variant: "destructive"
            });
            return;
          }
          // Fixed the function call to match the expected number of arguments
          const data = await fetchItinerary(storedApiKey, preferences, false);
          setItineraryData(data);
        } catch (error: any) {
          console.error("Failed to fetch itinerary:", error);
          toast({
            title: "Error fetching itinerary",
            description: error.message || "Failed to load itinerary. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    if (!itineraryData && slug) {
      fetchItineraryData();
    }
  }, [slug, preferences, toast, itineraryData]);

  const handleShare = async () => {
    if (!itineraryData) {
      toast({
        title: "Itinerary Not Available",
        description: "Please wait for the itinerary to load before sharing.",
        variant: "destructive"
      });
      return;
    }

    try {
      const shareableLink = await generateShareableLink(itineraryData.id);
      if (shareableLink) {
        navigator.clipboard.writeText(shareableLink);
        setCopySuccess(true);
        toast({
          title: "Link Copied",
          description: "The shareable link has been copied to your clipboard.",
        });
        setTimeout(() => setCopySuccess(false), 3000);
      } else {
        throw new Error("Failed to generate shareable link.");
      }
    } catch (error: any) {
      console.error("Error generating shareable link:", error);
      toast({
        title: "Share Failed",
        description: error.message || "Failed to generate shareable link. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBrowsePlans = () => {
    navigate('/plans');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ItineraryHeader 
        googleApiKey={googleApiKey}
        searchEngineId={searchEngineId}
        setGoogleApiKey={setGoogleApiKey}
        setSearchEngineId={setSearchEngineId}
        saveApiKeys={saveApiKeys}
        handleShare={handleShare}
        onBrowsePlans={handleBrowsePlans}
        itineraryContent={itineraryData?.content}
      />
      
      {loading ? (
        <div className="text-center">Loading itinerary...</div>
      ) : itineraryData ? (
        <ScrollArea className="h-[700px] w-full rounded-md border">
          <div ref={contentRef} className="space-y-4 p-4">
            {itineraryData.sections.map((section: any) => (
              <ItinerarySection key={section.id} section={section} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center">
          No itinerary data found. Please generate an itinerary first.
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;

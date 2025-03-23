
/**
 * Central utility for managing API keys across the application
 */

// Key names in localStorage
const KEYS = {
  OPENAI_API_KEY: 'openai_api_key',
  GOOGLE_MAPS_API_KEY: 'google_api_key',
  GOOGLE_SEARCH_ENGINE_ID: 'google_search_engine_id',
};

export interface ApiKeys {
  openaiApiKey?: string;
  googleMapsApiKey?: string;
  googleSearchEngineId?: string;
}

// Get all API keys
export const getAllApiKeys = (): ApiKeys => {
  return {
    openaiApiKey: localStorage.getItem(KEYS.OPENAI_API_KEY) || undefined,
    googleMapsApiKey: localStorage.getItem(KEYS.GOOGLE_MAPS_API_KEY) || undefined,
    googleSearchEngineId: localStorage.getItem(KEYS.GOOGLE_SEARCH_ENGINE_ID) || undefined,
  };
};

// Save API keys
export const saveApiKeys = (apiKeys: Partial<ApiKeys>): void => {
  if (apiKeys.openaiApiKey !== undefined) {
    localStorage.setItem(KEYS.OPENAI_API_KEY, apiKeys.openaiApiKey);
  }
  
  if (apiKeys.googleMapsApiKey !== undefined) {
    localStorage.setItem(KEYS.GOOGLE_MAPS_API_KEY, apiKeys.googleMapsApiKey);
  }
  
  if (apiKeys.googleSearchEngineId !== undefined) {
    localStorage.setItem(KEYS.GOOGLE_SEARCH_ENGINE_ID, apiKeys.googleSearchEngineId);
  }
};

// Check if specific APIs are configured
export const isOpenAIConfigured = (): boolean => !!localStorage.getItem(KEYS.OPENAI_API_KEY);
export const isGoogleMapsConfigured = (): boolean => !!localStorage.getItem(KEYS.GOOGLE_MAPS_API_KEY);
export const isGoogleSearchConfigured = (): boolean => (
  !!localStorage.getItem(KEYS.GOOGLE_MAPS_API_KEY) && 
  !!localStorage.getItem(KEYS.GOOGLE_SEARCH_ENGINE_ID)
);

// Get individual keys
export const getOpenAIApiKey = (): string => localStorage.getItem(KEYS.OPENAI_API_KEY) || '';
export const getGoogleMapsApiKey = (): string => localStorage.getItem(KEYS.GOOGLE_MAPS_API_KEY) || '';
export const getGoogleSearchEngineId = (): string => localStorage.getItem(KEYS.GOOGLE_SEARCH_ENGINE_ID) || '';


/**
 * Generates a shareable link for an itinerary
 * @param id - The ID of the itinerary to share
 * @returns A shareable URL for the itinerary
 */
export const generateShareableLink = async (id: string): Promise<string> => {
  try {
    // Generate a link to the itinerary page with the itinerary ID
    const baseUrl = window.location.origin;
    return `${baseUrl}/itinerary/${id}`;
  } catch (error) {
    console.error('Error generating shareable link:', error);
    throw new Error('Failed to generate shareable link');
  }
};

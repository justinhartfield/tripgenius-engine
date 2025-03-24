
import React from 'react';
import { extractUrls, removeUrls, getLocationUrl } from './urlUtils';
import { removeBrackets, extractBusinessNames } from './businessExtractor';
import { fetchBusinessRating, BusinessWithRating } from './ratingService';

/**
 * Process text to create hyperlinked business names as h2 elements with ratings
 */
export const addHyperlinksToActivityText = async (text: string): Promise<React.ReactNode> => {
  // Split the text into lines to process the title separately
  const lines = text.split('\n');
  
  if (lines.length === 0) return text;
  
  // The first line is usually the title/name of the place
  let titleLine = lines[0];
  const restOfText = lines.slice(1).join('\n');
  
  // Extract and remove URLs from the title
  const urls = extractUrls(titleLine);
  titleLine = removeBrackets(removeUrls(titleLine)).trim();
  
  // Clean description text - remove URLs and bracketed business names
  const cleanedText = removeBrackets(removeUrls(restOfText)).trim();
  
  // Create a title element with the main activity title
  const titleElement = React.createElement(
    'div',
    { className: "font-semibold text-primary mb-2" },
    titleLine
  );
  
  // Extract business names from the title and rest of text
  // First check the title for the main business name
  const titleBusinessNames = extractBusinessNames(titleLine);
  
  // Only use business names from the description if we didn't find any in the title
  const allBusinessNames = titleBusinessNames.length > 0 
    ? titleBusinessNames 
    : extractBusinessNames(cleanedText);
  
  // Fetch ratings for each business (in a real app, would be done via API)
  const businessesWithRatings: BusinessWithRating[] = await Promise.all(
    allBusinessNames.slice(0, 1).map(async (business) => {
      const url = urls.length > 0 ? urls[0] : getLocationUrl(business);
      const ratingData = await fetchBusinessRating(business);
      
      return {
        name: business,
        url,
        rating: ratingData.rating,
        reviewCount: ratingData.reviewCount
      };
    })
  );
  
  // Create business name elements with hyperlinks and ratings
  const businessNameLinks = businessesWithRatings.map((business, index) => {
    const ratingStars = business.rating 
      ? React.createElement(
          'span', 
          { className: "ml-2 text-yellow-400" }, 
          `★ ${business.rating.toFixed(1)}${business.reviewCount ? ` (${business.reviewCount})` : ''}`
        ) 
      : null;
      
    return React.createElement(
      'h2',
      { 
        key: `business-name-${index}`,
        className: "text-lg font-medium text-primary mb-3 flex items-center" 
      },
      [
        React.createElement(
          'a',
          {
            href: business.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:underline"
          },
          business.name
        ),
        ratingStars
      ]
    );
  });
  
  // Only include the first business name to avoid repetition
  const uniqueBusinessLinks = businessNameLinks.length > 0 
    ? [businessNameLinks[0]] 
    : [];
  
  // Add the regular text without business names
  return React.createElement(
    React.Fragment,
    null,
    titleElement,
    uniqueBusinessLinks,
    React.createElement('div', {className: "text-base mt-1"}, cleanedText)
  );
};

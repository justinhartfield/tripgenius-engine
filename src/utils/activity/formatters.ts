
/**
 * Formats activity text by cleaning up HTML or markdown artifacts
 */
export const formatActivityText = (text: string): string => {
  return text
    .replace(/\\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\n\n###/g, '\n###')
    .replace(/\n\n##/g, '\n##')
    .replace(/\n\n#/g, '\n#')
    .replace(/\*\*/g, '')
    .replace(/\\\*/g, '*')
    .replace(/\\/g, '')
    .replace(/\n###\s?/g, '\n')
    .replace(/\n##\s?/g, '\n')
    .replace(/\n#\s?/g, '\n')
    .replace(/\|\n\|/g, '\n');
};

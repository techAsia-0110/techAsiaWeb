/**
 * Formats a date string (e.g., "2023-08-15" or "2023-08-15T00:00:00.000Z") 
 * into a more readable format (e.g., "August 15, 2023").
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date, or "Invalid Date" if the input is invalid.
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";

  const dateOnlyString = dateString.substring(0, 10);

  
  const date = new Date(`${dateOnlyString}T00:00:00`);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
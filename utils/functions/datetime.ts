/**
 * Formats a given date into a string representation using the Intl.DateTimeFormat.
 * The resulting string includes the full month name, two-digit day, and full year.
 *
 * @param {Date} date - The date object to be formatted.
 * @returns {string} - The formatted date string, e.g., "January 01, 2023".
 *
 * @example
 * const formattedDate = getDateTimeFormat(new Date());
 * console.log(formattedDate); // Outputs a formatted date string based on the current date.
 */
export const getDateTime = (date: Date | string | number): string => {
  const dateObj = new Date(date)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(dateObj)
}

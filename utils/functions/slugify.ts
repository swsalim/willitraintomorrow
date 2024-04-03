/**
 * Converts a string into a slug suitable for URLs or file names.
 * The resulting slug is lowercase, has whitespace trimmed,
 * non-alphanumeric characters (except for hyphens) removed,
 * spaces replaced with hyphens, and consecutive hyphens condensed into one.
 *
 * @param {string} text - The input string to be slugified.
 * @returns {string} - The slugified version of the input string.
 *
 * @example
 * slugify('Hello World!'); // Returns 'hello-world'
 * slugify('  Good Morning  '); // Returns 'good-morning'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/[^a-z0-9 -]/g, '') // Remove all non-word chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
}

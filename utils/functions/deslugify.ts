/**
 * Reverts a slugified string back to a more readable format where
 * each word is capitalized. This is the inverse operation of slugifying a string.
 * Useful for converting URL slugs or file names back into human-readable titles.
 *
 * @param {string} slug - The slugified string to be reverted.
 * @returns {string} - The human-readable version of the slug, with each word capitalized.
 *
 * @example
 * deslugify('kuala-lumpur'); // Returns 'Kuala Lumpur'
 * deslugify('buenos-aires'); // Returns 'Buenos Aires'
 */
export function deslugify(slug: string): string {
  return (
    slug
      // Split the slug into words
      .split('-')
      // Capitalize the first letter of each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // Join the words back together with a space
      .join(' ')
  )
}

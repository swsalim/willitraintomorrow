import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges multiple CSS class names or values using the classix and tailwind-merge libraries.
 * This function takes any number of arguments and passes them to the cx function from classix,
 * which generates a combined class name string. The result is then passed to twMerge from tailwind-merge,
 * which merges any overlapping or duplicate classes into a final single string.
 * @param args The CSS class names or values to be combined and merged.
 * @returns A merged string containing the combined CSS class names or values.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
export const getDateTimeFormat = (date: Date | string | number): string => {
  const dateObj = new Date(date)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(dateObj)
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
}

export function imageKitLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  if (src[0] === '/') src = src.slice(1)
  const params = [`w-${width}`]
  if (quality) {
    params.push(`q-${quality}`)
  }
  const paramsString = params.join(',')
  let urlEndpoint = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`
  if (urlEndpoint[urlEndpoint.length - 1] === '/') {
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1)
  }

  return `${urlEndpoint}/${src}?tr=${paramsString}`
}

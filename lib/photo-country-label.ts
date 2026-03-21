/** Turn middleware country param (often ISO2) into a readable place name for photo search. */
export function getCountryLabelForPhotoSearch(countryParam: string): string {
  const t = countryParam.trim()
  if (!t) return ''

  if (/^[A-Za-z]{2}$/.test(t)) {
    try {
      const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(
        t.toUpperCase()
      )
      if (name) return name
    } catch {
      /* ignore */
    }
  }

  return t
}

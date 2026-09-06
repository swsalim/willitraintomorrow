import Link from 'next/link'

import { CITY_NAV_ITEMS } from '@/lib/city-nav-index'
import { cn } from '@/lib/utils'

export function RelatedCities({
  countryCode,
  currentHref,
  className,
}: {
  countryCode: string
  currentHref: string
  className?: string
}) {
  const related = CITY_NAV_ITEMS.filter(
    (c) =>
      c.href.startsWith(`/${countryCode.toLowerCase()}/`) &&
      c.href !== currentHref
  ).slice(0, 8)

  const fallback =
    related.length > 0
      ? related
      : CITY_NAV_ITEMS.filter((c) => c.href !== currentHref).slice(0, 6)

  return (
    <section
      className={cn(
        'border-t border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] py-12',
        className
      )}
      aria-labelledby="related-heading"
    >
      <h2
        id="related-heading"
        className="font-display text-xl font-bold tracking-tight"
      >
        Other cities
      </h2>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
        {fallback.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="text-[var(--wirt-muted)] underline-offset-4 transition hover:text-[var(--wirt-fg)] hover:underline"
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      data-theme="light"
      data-atmosphere="cloud"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--wirt-bg)] px-4 text-[var(--wirt-fg)]"
    >
      <h1 className="font-display text-4xl font-bold tracking-tight">
        City not found
      </h1>
      <p className="mt-3 max-w-[36ch] text-center text-[var(--wirt-muted)]">
        That location is not in our catalog yet. Try searching for another city.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-[var(--wirt-fg)] px-5 py-3 text-sm font-semibold text-[var(--wirt-bg)]"
      >
        Find your city
      </Link>
    </main>
  )
}

'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      data-theme="light"
      data-atmosphere="storm"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--wirt-bg)] px-4 text-[var(--wirt-fg)]"
    >
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Forecast unavailable
      </h1>
      <p className="mt-3 max-w-[40ch] text-center text-[var(--wirt-muted)]">
        We could not load tomorrow&apos;s rain forecast right now. Try again in
        a moment.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-[var(--wirt-fg)] px-5 py-3 text-sm font-semibold text-[var(--wirt-bg)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-[color-mix(in_oklab,var(--wirt-fg)_20%,transparent)] px-5 py-3 text-sm font-semibold"
        >
          Home
        </Link>
      </div>
    </main>
  )
}

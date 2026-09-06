import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-[color-mix(in_oklab,var(--wirt-fg)_10%,transparent)]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-[22%]"
          />
          <p className="font-display text-sm font-semibold tracking-tight">
            Will It Rain Tomorrow?
          </p>
        </div>
        <p className="mt-2 max-w-[40ch] text-sm text-[var(--wirt-muted)]">
          A tiny weather website with one job.
        </p>
        <p className="mt-6 text-sm text-[var(--wirt-muted)]">
          Forecast data by{' '}
          <a
            href="https://www.weatherapi.com/"
            className="underline underline-offset-4 hover:text-[var(--wirt-fg)]"
            target="_blank"
            rel="noreferrer"
          >
            WeatherAPI
          </a>
          . Built by{' '}
          <a
            href="https://www.yuurrific.com"
            className="underline underline-offset-4 hover:text-[var(--wirt-fg)]"
            target="_blank"
            rel="noreferrer"
          >
            Yuurrific
          </a>
          . Analytics by{' '}
          <a
            href="https://seline.com/?via=yuyu"
            className="underline underline-offset-4 hover:text-[var(--wirt-fg)]"
            target="_blank"
            rel="noreferrer"
          >
            Seline
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-[var(--wirt-muted)]">
          <Link
            href="/destinations"
            className="underline underline-offset-4 hover:text-[var(--wirt-fg)]"
          >
            Destinations
          </Link>
          <span className="mx-2 opacity-40">·</span>
          Location stays on your device. We do not require an account.
        </p>
      </div>
    </footer>
  )
}

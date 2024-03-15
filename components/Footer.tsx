import Link from 'next/link'

export function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="text-sm leading-5 text-stone-900">
          &copy; {` `}
          {new Date().getFullYear()} {` `}
          wateraday.com.
          <span className="ml-2 mt-0 inline-block text-stone-900">
            Built by{' '}
            <a
              href="https://www.yuurrific.com"
              className="inline-block font-medium underline underline-offset-4"
              target="_blank"
            >
              Yuurrific
            </a>
            .
          </span>
          <span className="mt-2 block text-stone-900 md:ml-2 md:mt-0 md:inline-block">
            Privacy-friendly analytics by{' '}
            <Link
              href="/get/simpleanalytics"
              className="inline-block rotate-0 rounded-md bg-blue-600 px-2 py-1 text-stone-100 transition duration-100 ease-out hover:-rotate-3 hover:ease-in"
              target="_blank"
            >
              SimpleAnalytics
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}

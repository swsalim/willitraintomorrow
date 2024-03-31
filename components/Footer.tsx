import Link from 'next/link'

export function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="text-stone-900 text-sm leading-5">
          &copy; {` `}
          {new Date().getFullYear()} {` `}
          willitraintomorrow.com.
          <span className="text-stone-900 ml-2 mt-0 inline-block">
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
          <span className="text-stone-900 mt-2 block md:ml-2 md:mt-0 md:inline-block">
            Privacy-friendly analytics by{' '}
            <Link
              href="/get/simpleanalytics"
              className="bg-blue-600 text-stone-100 inline-block rotate-0 rounded-md px-2 py-1 transition duration-100 ease-out hover:-rotate-3 hover:ease-in"
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

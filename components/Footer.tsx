import Link from 'next/link'

export function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="text-sm leading-5 text-gray-900">
          &copy; {` `}
          {new Date().getFullYear()} {` `}
          willitraintomorrow.com.
          <span className="mt-0 ml-2 inline-block text-gray-900">
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
          <span className="mt-2 block text-gray-900 md:mt-0 md:ml-2 md:inline-block">
            Privacy-friendly analytics by{' '}
            <a
              href="https://seline.com/?via=yuyu"
              className="inline-block rotate-0 rounded-md bg-amber-700 px-2 py-1 text-amber-100 transition duration-100 ease-out hover:-rotate-3 hover:ease-in"
              target="_blank"
            >
              Seline
            </a>
          </span>
        </p>
      </div>
    </footer>
  )
}

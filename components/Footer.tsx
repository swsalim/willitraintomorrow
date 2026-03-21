import Link from 'next/link'

export function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p className="text-sm leading-5 text-slate-400">
          &copy; {` `}
          {new Date().getFullYear()} {` `}
          willitraintomorrow.com.
          <span className="mt-0 ml-2 inline-block text-slate-400">
            Built by{' '}
            <a
              href="https://www.yuurrific.com"
              className="inline-block font-medium text-violet-800 underline underline-offset-4 transition hover:text-violet-600"
              target="_blank"
            >
              Yuurrific
            </a>
            .
          </span>
          <span className="mt-2 block text-slate-400 md:mt-0 md:ml-2 md:inline-block">
            Privacy-friendly analytics by{' '}
            <a
              href="https://seline.com/?via=yuyu"
              className="inline-block rotate-0 rounded-md bg-violet-600/80 px-2 py-1 text-violet-50 transition duration-100 ease-out hover:-rotate-3 hover:bg-violet-500 hover:ease-in"
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

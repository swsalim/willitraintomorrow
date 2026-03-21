import { Footer } from '@/components/Footer'
import { MainNav } from '@/components/MainNav'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

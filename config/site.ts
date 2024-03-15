import { SiteConfig } from 'types'

export const siteConfig: SiteConfig = {
  title: 'How Much Water Should You Drink Daily?',
  description: 'Calculate Your Optimal Daily Hydration Needs in Seconds',
  siteName: 'Water a Day',
  url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for wateraday.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
}

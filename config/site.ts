import { SiteConfig } from 'types'

export const siteConfig: SiteConfig = {
  title: 'Forecasting Sunshine and Showers for You',
  description:
    'Tomorrow’s Weather Forecast, Today’s Advantage - Plan Your Day Right, Come Rain or Shine',
  siteName: 'Will It Rain Tomorrow',
  url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  author: {
    name: 'Yuyu',
    url: 'https://www.yuurrific.com',
  },
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for willitraintomorrow.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
}

import { SiteConfig } from 'types'
import { absoluteUrl } from '@/lib/utils'

export const siteConfig: SiteConfig = {
  title: 'Will It Rain Tomorrow? Weather Forecast',
  description:
    'Tomorrow’s weather forecast and rain chances by city. Plan your day—come rain or shine.',
  siteName: 'Will It Rain Tomorrow',
  url: absoluteUrl('/'),
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

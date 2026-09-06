import { SiteConfig } from 'types'
import { absoluteUrl } from '@/lib/utils'

export const siteConfig: SiteConfig = {
  title: 'Will It Rain Tomorrow?',
  description:
    'One question. One answer. Find out if you need an umbrella tomorrow, and when rain is most likely.',
  siteName: 'Will It Rain Tomorrow',
  url: absoluteUrl('/'),
  author: {
    name: 'Yuyu',
    url: 'https://www.yuurrific.com',
  },
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Will It Rain Tomorrow - One question. One answer.',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
}

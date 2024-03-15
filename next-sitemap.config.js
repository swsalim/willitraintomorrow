// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
]

const exclude = [
  '/dashboard*',
  '/404',
  '/api*',
  '/login',
  '/server-sitemap.xml',
]

const config = {
  siteUrl: 'https://www.wateraday.com/',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: NEXT_SSG_FILES }],
  },
}

module.exports = config

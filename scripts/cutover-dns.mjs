#!/usr/bin/env node
/**
 * Cut over willitraintomorrow.com DNS from Vercel origin to the willitraintomorrow Worker.
 *
 * Requires a Cloudflare API token with Zone.DNS Edit on willitraintomorrow.com:
 *   https://dash.cloudflare.com/profile/api-tokens
 *   Template: "Edit zone DNS" → zone willitraintomorrow.com
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node scripts/cutover-dns.mjs
 *
 * What it does:
 * 1. Orange-clouds existing www / apex records (so Worker zone routes run)
 * 2. Optionally replaces them with Worker custom domains when --custom-domains is passed
 */
const ZONE_NAME = 'willitraintomorrow.com'
const ACCOUNT_HINT = '24fa830abde351a8eb6e9f05e78aa702'
const HOSTS = ['www.willitraintomorrow.com', 'willitraintomorrow.com']
const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN

if (!token) {
  console.error('Set CLOUDFLARE_API_TOKEN (Zone.DNS Edit) and re-run.')
  process.exit(1)
}

const useCustomDomains = process.argv.includes('--custom-domains')

async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!json.success) {
    throw new Error(`${method} ${path}: ${JSON.stringify(json.errors)}`)
  }
  return json.result
}

const zones = await api(`/zones?name=${ZONE_NAME}`)
if (!zones.length) throw new Error(`Zone ${ZONE_NAME} not found`)
const zoneId = zones[0].id
console.log(`Zone ${ZONE_NAME} (${zoneId})`)

const PROXYABLE = new Set(['A', 'AAAA', 'CNAME'])
const records = await api(`/zones/${zoneId}/dns_records?per_page=100`)
const hostRecords = records.filter((r) => HOSTS.includes(r.name))
const relevant = hostRecords.filter((r) => PROXYABLE.has(r.type))
console.log(
  'Current records:\n',
  hostRecords
    .map((r) => `${r.type} ${r.name} proxied=${r.proxied} -> ${r.content}`)
    .join('\n ')
)

if (useCustomDomains) {
  for (const record of relevant) {
    console.log(`Deleting ${record.type} ${record.name}...`)
    await api(`/zones/${zoneId}/dns_records/${record.id}`, { method: 'DELETE' })
  }
  for (const hostname of HOSTS) {
    console.log(`Attaching Worker custom domain ${hostname}...`)
    await api(`/accounts/${ACCOUNT_HINT}/workers/domains`, {
      method: 'POST',
      body: {
        hostname,
        service: 'willitraintomorrow',
        zone_id: zoneId,
      },
    })
  }
} else {
  for (const record of relevant) {
    if (record.proxied) {
      console.log(`Already proxied: ${record.type} ${record.name}`)
      continue
    }
    console.log(`Enabling proxy on ${record.type} ${record.name}...`)
    await api(`/zones/${zoneId}/dns_records/${record.id}`, {
      method: 'PATCH',
      body: { proxied: true },
    })
  }
}

console.log('Done. Verify: curl -sI https://www.willitraintomorrow.com | head')

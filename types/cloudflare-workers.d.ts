declare module 'cloudflare:workers' {
  export const env: {
    ASSETS?: { fetch: (input: RequestInfo) => Promise<Response> }
    [key: string]: unknown
  }
}

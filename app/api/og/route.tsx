import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

async function loadAsset(
  path: string,
  requestUrl: string
): Promise<ArrayBuffer> {
  // Prefer ASSETS binding when running on Cloudflare Workers
  try {
    const { env } = (await import('cloudflare:workers')) as {
      env: { ASSETS?: { fetch: (input: RequestInfo) => Promise<Response> } }
    }
    if (env?.ASSETS) {
      const res = await env.ASSETS.fetch(new Request(new URL(path, requestUrl)))
      if (res.ok) return res.arrayBuffer()
    }
  } catch {
    // Not on Workers (or binding unavailable)
  }

  const res = await fetch(new URL(path, requestUrl))
  if (!res.ok) {
    throw new Error(`Failed to load asset ${path}`)
  }
  return res.arrayBuffer()
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const [fontData, imageBuffer] = await Promise.all([
      loadAsset('/fonts/CalSans-SemiBold.ttf', req.url),
      loadAsset('/images/og-background.jpeg', req.url),
    ])

    const imageData = `data:image/jpeg;base64,${toBase64(imageBuffer)}`

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

    return new ImageResponse(
      (
        <div
          tw="h-full w-full flex items-center justify-center bg-gray-100"
          style={{ backgroundImage: `url(${imageData})` }}
        >
          <div tw="flex items-center justify-center h-full">
            <div tw="flex flex-col justify-center items-center w-full h-full p-20">
              <div tw="flex flex-col items-center">
                <h1 tw="text-7xl text-gray-900 font-bold text-center mb-0 leading-tight text-[#1F3C4A] capitalize">
                  {title}
                </h1>
                <p tw="text-gray-700 font-semibold capitalize mt-4 text-xl text-center text-[#1F3C4A]">
                  willitraintomorrow.com
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Cal Sans',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.log(message)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

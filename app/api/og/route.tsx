import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const font = fetch(
  new URL('../../../assets/fonts/CalSans-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontData = await font
    const { searchParams } = new URL(req.url)
    // console.log(import.meta.url);

    // const logoData = await fetch(
    //   new URL('../../images/logo.png', import.meta.url),
    // )
    //   .then((res) => res.arrayBuffer())
    //   .then(
    //     (buf) =>
    //       `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`,
    //   );

    const imageData = await fetch(
      new URL('../../../images/og-background.jpeg', import.meta.url)
    )
      .then((res) => res.arrayBuffer())
      .then(
        (buf) => `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`
      )

    // ?title=<title>
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
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

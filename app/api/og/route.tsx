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
          tw="h-full w-full flex items-center justify-center bg-stone-100"
          style={{ backgroundImage: `url(${imageData})` }}
        >
          <div tw="flex items-center justify-center h-full">
            <div tw="flex flex-col justify-center items-center w-full h-full p-20">
              <svg
                width="80"
                height="110"
                viewBox="0 0 730 972"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M364.5 0.5C351.353 25.2417 339.845 43.8179 314 83C314 83 291.5 114 229.5 186C195.029 226.031 174.9 248.596 159.542 265.813L159.541 265.814L159.538 265.818C147.274 279.565 138.053 289.903 127 303C102.105 332.5 87 358.5 69.5 391C52 423.5 47.5 455 45.5 491.5C43.5 528 56.5 568.5 65.5 582.5C67.583 585.74 69.0232 588.739 70.5768 591.975C75.7361 602.719 82.1463 616.068 117.5 649.5C163.5 693 197.5 713 224.5 722.5C229.375 724.215 233.941 726.061 238.632 727.958L238.634 727.959C259.924 736.566 283.808 746.222 351 749.5C433 753.5 504 722.5 504 722.5C504 722.5 586.5 680.5 615.5 649.5C644.5 618.5 673 562 673 562C673 562 691 513 687 479.5C686.509 475.388 686.086 471.562 685.685 467.939L685.684 467.93C682.821 442.045 681.104 426.524 664 391C644.5 350.5 633 335.5 601 301.5C582.455 281.796 571.467 268.641 556.357 250.552L556.355 250.549L556.354 250.548C545.392 237.424 532.26 221.703 512.5 199C465.5 145 416.5 83 416.5 83L364.5 0.5ZM26.5 460.5C26.5 550 31 610.5 69.5 656C108 701.5 221.5 804.5 375 793C528.5 781.5 579.5 757.5 644.5 677.5C709.5 597.5 709.5 479.5 709.5 479.5C709.5 479.5 739 591 726 656C725.226 659.87 724.464 663.74 723.703 667.611L723.696 667.646C711.667 728.771 699.618 790.001 638.5 853C573.5 920 492 965 367.5 971C243 977 137.5 895 98 859.5C58.5 824 14.5 734 2.50001 644.5C-9.49999 555 26.5 460.5 26.5 460.5ZM49.5 706.5C49.5 706.5 150 879.5 381.5 865.5C613 851.5 685.5 706.5 685.5 706.5C685.5 706.5 651.5 795.288 581.5 844.5C511.5 893.712 428.5 913.5 381.5 913.5C334.5 913.5 222 899.111 150.5 849C79 798.889 49.5 706.5 49.5 706.5Z"
                  fill="#1F3C4A"
                />
              </svg>

              <div tw="flex flex-col items-center">
                <h1 tw="text-7xl text-stone-900 font-bold text-center mb-0 leading-tight text-[#1F3C4A] capitalize">
                  {title}
                </h1>
                <p tw="text-stone-700 font-semibold capitalize mt-4 text-xl text-center text-[#1F3C4A]">
                  wateraday.com
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

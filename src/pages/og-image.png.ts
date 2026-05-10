import { fontData, experimental_getFontFileURL } from 'astro:assets'
import type { APIRoute } from 'astro'
import { ImageResponse } from '@takumi-rs/image-response'
import type { FontDetails } from '@takumi-rs/core'

import ogImage from '../og-image'

export const GET: APIRoute = async (context) => {
  const fonts: FontDetails[] = await Promise.all(
    fontData['--font-montserrat'].map(async (font) => ({
      name: 'Montserrat',
      weight: Number(font.weight),
      style: font.style as any,
      data: await fetch(
        experimental_getFontFileURL(font.src[0]!.url, context.url),
      ).then((res) => res.arrayBuffer()),
    })),
  )

  return new ImageResponse(ogImage(), {
    width: 1200,
    height: 630,
    format: 'png',
    fonts,
  })
}

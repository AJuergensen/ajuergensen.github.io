import { readFile } from 'node:fs/promises'
import { fontData } from 'astro:assets'
import { outDir } from 'astro:config/server'
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
      data: import.meta.env.DEV
        ? await fetch(new URL(font.src[0]!.url, context.url.origin)).then(
            (res) => res.arrayBuffer(),
          )
        : await readFile(new URL(`.${font.src[0]!.url}`, outDir)),
    })),
  )

  return new ImageResponse(ogImage(), {
    width: 1200,
    height: 630,
    format: 'png',
    fonts,
  })
}

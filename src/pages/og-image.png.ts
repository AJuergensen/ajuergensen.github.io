import { readFile } from 'node:fs/promises'
import type { APIRoute } from 'astro'
import satori, { type FontWeight } from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { createNoise3D } from 'simplex-noise'

export const GET: APIRoute = async function get() {
  const resolution = 15
  const noiseResolution = 0.02
  const color = (value: number) => `rgba(0, 0, 0, ${value * 0.15})`
  const size = (value: number) => value * 4
  const noise = createNoise3D()
  const width = 1200
  const height = 630
  const dots = []
  for (let y = 0; y < Math.ceil(height / resolution); y++) {
    for (let x = 0; x < Math.ceil(width / resolution); x++) {
      const value = (noise(x * noiseResolution, y * noiseResolution, 0) + 1) / 2
      dots.push({
        type: 'div',
        props: {
          style: {
            display: 'flex',
            backgroundColor: color(value),
            width: size(value),
            height: size(value),
            borderRadius: '100%',
            position: 'absolute',
            top: (y + 0.5) * resolution,
            left: (x + 0.5) * resolution,
          },
        },
      })
    }
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          color: '#000',
        },
        children: [
          ...dots,
          {
            type: 'img',
            props: {
              src: `data:image/jpeg;base64,${await readFile('src/assets/photo.jpg', 'base64')}`,
              style: {
                width: 350,
                height: 350,
                borderRadius: '100%',
                border: '4px solid #fff',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: 32,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            fontWeight: '600',
                          },
                          children: 'Anna-Maria Jürgensen',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            opacity: 0.2,
                            fontWeight: '300',
                          },
                          children: ', PhD',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      opacity: 0.5,
                      fontSize: 26,
                      marginTop: 3,
                    },
                    children: 'Computational neuroscientist',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      opacity: 0.3,
                      fontSize: 28,
                      marginTop: 30,
                    },
                    children: 'Learning & memory',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: await Promise.all(
        Array.from({ length: 9 }).map(async (_, i) => ({
          name: 'Montserrat',
          weight: ((i + 1) * 100) as FontWeight,
          style: 'normal',
          data: await readFile(
            `node_modules/@fontsource/montserrat/files/montserrat-latin-${(i + 1) * 100}-normal.woff`,
          ),
        })),
      ),
    },
  )

  return new Response(Buffer.from(new Resvg(svg, {}).render().asPng()), {
    headers: { 'Content-Type': 'image/png' },
  })
}

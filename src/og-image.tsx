import { createNoise3D } from 'simplex-noise'
import photo from './assets/photo.jpg?inline'

export default function () {
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
      dots.push(
        <div
          tw="flex rounded-full absolute"
          style={{
            backgroundColor: color(value),
            width: size(value),
            height: size(value),
            top: (y + 0.5) * resolution,
            left: (x + 0.5) * resolution,
          }}
        />,
      )
    }
  }

  return (
    <div
      tw="flex justify-center items-center gap-8 size-full bg-white text-black"
      style={{ fontFamily: 'Montserrat' }}
    >
      {...dots}
      <img
        src={photo}
        tw="size-88 border-solid rounded-full border-4 border-white shadow-xl"
      />
      <div tw="flex flex-col">
        <div tw="flex text-[32px]">
          <div tw="font-semibold">Anna-Maria Jürgensen</div>
          <div tw="opacity-20 font-light">, PhD</div>
        </div>
        <div tw="opacity-50 text-[26px] mt-1">Computational neuroscientist</div>
        <div tw="opacity-30 text-[28px] mt-7">Learning & memory</div>
      </div>
    </div>
  )
}

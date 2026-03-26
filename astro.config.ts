import { defineConfig, fontProviders } from 'astro/config'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://ajuergensen.github.io',
  trailingSlash: 'never',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal'],
    },
  ],
})

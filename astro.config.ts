import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://anna.nikolasdas.de',
  trailingSlash: 'never',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
})

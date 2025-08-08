import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://ajuergensen.github.io',
  trailingSlash: 'never',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
})

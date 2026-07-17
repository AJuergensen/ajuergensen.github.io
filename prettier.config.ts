import { type Config } from 'prettier'

const config: Config = {
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

export default config

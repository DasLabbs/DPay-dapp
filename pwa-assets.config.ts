import { defineConfig, minimal2023Preset as preset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...preset,
    transparent: {
      ...preset.transparent,
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
    },
    maskable: {
      ...preset.maskable,
      sizes: [512],
      padding: 0,
      resizeOptions: {
        background: '#1712FF',
      },
    },
    apple: {
      ...preset.apple,
      sizes: [180],
      padding: 0,
      resizeOptions: {
        background: '#1712FF',
      },
    },
  },
  images: ['public/pwa-512.png'],
});

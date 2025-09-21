import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  },
  server: {
    host: true, // Allow external connections
    port: 4321
  }
});

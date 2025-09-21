import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: true, // Allow external connections
    port: 4321
  }
});

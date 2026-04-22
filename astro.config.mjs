import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
  site: 'https://thecognitiveshift.com',
  integrations: [react(), keystatic()],
});

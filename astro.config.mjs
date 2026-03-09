import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
  site: 'https://thecognitiveshift.com',
  integrations: [keystatic()],
});

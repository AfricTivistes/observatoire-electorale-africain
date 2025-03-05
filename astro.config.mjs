import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  vite: {
    server: {
      allowedHosts: ["a22498e3-6a90-47ec-a7b1-c43dac13b9eb-00-22stm46m8as0q.janeway.replit.dev"]
    },
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});

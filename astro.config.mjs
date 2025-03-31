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
      allowedHosts: ["70370caa-448e-4e15-9c40-b24a18d38e38-00-tpxsv7xfb1yo.janeway.replit.dev"]
    },
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});

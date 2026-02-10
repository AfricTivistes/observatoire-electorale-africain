import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from "astro-pagefind";

export default defineConfig({
  output: "static",
  build: {
    format: "file",
    concurrency: 1, // Build pages one at a time to reduce API pressure on NocoDB
  },
  integrations: [
    react(),
    tailwind(),
    pagefind()
  ],
  vite: {
    server: {
      allowedHosts: ["0850f02d-812e-4252-880e-b2c401797a0b-00-2bzakmgquz1ga.kirk.replit.dev"]
    },
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});

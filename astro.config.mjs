import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from "astro-pagefind";

export default defineConfig({
  output: "static",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    tailwind(),
    pagefind()
  ],
  output: 'static',
  vite: {
    server: {
      allowedHosts: ["0850f02d-812e-4252-880e-b2c401797a0b-00-2bzakmgquz1ga.kirk.replit.dev"]
    },
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});

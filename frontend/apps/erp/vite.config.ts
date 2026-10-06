import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // Must be first — source inspection, console piping, production stripping (all on by default)
    devtools(),
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    // Solid's Vite plugin must come after Start's plugin
    viteSolid({ ssr: true }),
    tailwindcss(),
  ],
});

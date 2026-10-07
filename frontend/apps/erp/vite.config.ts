import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { defineConfig } from 'vite';
import viteSolid from 'vite-plugin-solid';
import solidSVG from 'vite-solid-svg';

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
    // Cookie-based locale only — no urlPatterns / no router rewrite (SPA keeps canonical paths)
    paraglideVitePlugin({ project: './project.inlang' }),
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    // Transform *.svg?solid before Solid compiles JSX
    solidSVG(),
    // Solid's Vite plugin must come after Start's plugin
    viteSolid({ ssr: true }),
    tailwindcss(),
  ],
});

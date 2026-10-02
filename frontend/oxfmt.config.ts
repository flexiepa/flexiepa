import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.vite/**',
    '**/pnpm-lock.yaml',
    '**/*.gen.ts',
  ],
  // Defaults already sort package.json keys; keep scripts sorted too
  sortPackageJson: {
    sortScripts: true,
  },
  // Defaults are fine; only teach oxfmt that @flexiepa/* is internal
  sortImports: {
    internalPattern: ['@flexiepa/**'],
  },
});

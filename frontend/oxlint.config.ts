import solidTypescript from 'eslint-plugin-solid/configs/typescript';
import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'import'],
  jsPlugins: ['eslint-plugin-solid'],
  ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/.vite/**', '**/*.gen.ts'],
  rules: {
    // Vite/Solid CSS side-effect imports
    'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],
  },
  overrides: [
    {
      files: ['apps/**/*.{jsx,tsx}', 'packages/**/*.{jsx,tsx}'],
      rules: solidTypescript.rules,
    },
  ],
});

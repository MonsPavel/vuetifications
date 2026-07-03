/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import dts from 'vite-plugin-dts'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types',
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.d.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/__tests__/**', 'src/stories/**'],
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
      compilerOptions: {
        declaration: true,
        declarationMap: true
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vuetifications',
      fileName: format => `vuetifications.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/stories/**', 'src/**/*.d.ts', 'src/**/__tests__/**'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    },
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        environment: 'jsdom',
        include: ['src/**/__tests__/**/*.test.ts']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(__dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});
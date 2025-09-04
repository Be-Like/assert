import { defineConfig } from 'vite'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: false,

    minify: 'terser',

    esbuild: {
      legalComments: 'inline',
    },

    terserOptions: {
      format: {
        comments: 'all'
      }
    },

    rollupOptions: {
      input: {
        a: resolve(__dirname, 'src/lib/index.js')
      },
      output: {
        entryFileNames: 'index.js',
        format: 'es',
        inlineDynamicImports: false,
        preserveModules: true, // I want to preserve the original file structure as much as possible.
      }
    }
  },

  test: {
    mode: 'test',
    setupFiles: [fileURLToPath(new URL('./vitest.setup.js', import.meta.url))],
    coverage: { exclude: []},
    environment: 'node',
    isolate: false,
    reporters: ['default', 'html'],
    maxConcurrency: 5,
    cache: false,
    sequence: { shuffle: true },
    slowTestThreshold: 300,
    outputFile: { html: './test_gui/index.html' }
  },
})

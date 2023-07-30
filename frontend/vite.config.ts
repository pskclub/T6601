import { defineConfig } from 'vitest/config'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'setupTests.ts',
  },
  plugins: [
    VueTypeImports(),
    AutoImport({
      imports: ['vitest', 'vue'],
      dts: true, // generate TypeScript declaration
      dirs: ['utils', 'constants'],
      vueTemplate: true,
    }),
  ],
})

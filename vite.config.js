import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'TatumSDK', // Replace with your desired global variable name
      formats: ['es', 'umd', 'iife'], // Include 'iife' in the formats
      fileName: (format) => `tatum-sdk.${format}.js`,
    },
    rollupOptions: {
      external: ['bignumber.js', 'chalk', 'reflect-metadata', 'typedi'],
      output: {
        globals: {
          'bignumber.js': 'BigNumber',
          chalk: 'Chalk',
          'reflect-metadata': 'ReflectMetadata',
          typedi: 'TypeDI',
        },
      },
    },
  },
})

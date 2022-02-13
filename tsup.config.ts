import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/jsx-runtime.ts'],
  minify: true,
  sourcemap: true,
  format: ['esm'],
});

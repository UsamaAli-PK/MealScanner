import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  base: './', // This ensures proper path resolution when deployed
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Using esbuild minifier instead of terser since it's built-in to Vite
    minify: 'esbuild',
  },
  server: {
    port: 3000 // Optional: specify a port
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  build: {
    // No source maps in production — real security
    sourcemap: false,
    // Minify with esbuild (fastest)
    minify: 'esbuild',
    // Target modern browsers only
    target: 'es2020',
    // Asset inlining threshold (4KB)
    assetsInlineLimit: 4096,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Dev server
  server: {
    port: 5173,
    open: true,
  },
});

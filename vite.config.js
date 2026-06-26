import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // No source maps in production — real security
    sourcemap: false,
    // Minify with esbuild (fastest)
    minify: 'esbuild',
    // Target modern browsers only
    target: 'es2020',
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion', 'gsap'],
        },
      },
    },
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

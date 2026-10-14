import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Live Spring Boot backend hosted on Render.
const RENDER_BACKEND = 'https://apexgrid-backend-ejej.onrender.com';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Same-origin fallback proxy for local development. The API layer calls the
    // Render backend directly first, and transparently falls back to `/api/*`.
    proxy: {
      '/api': {
        target: RENDER_BACKEND,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': {
        target: RENDER_BACKEND,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
});

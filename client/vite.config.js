// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Set output directory to 'build'
  },
  server: {
    watch: {
      usePolling: true, // Optional: Enables polling for file changes, useful in some environments.
    },
  },
});

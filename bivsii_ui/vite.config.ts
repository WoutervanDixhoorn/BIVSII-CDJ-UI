import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    watch: {
      usePolling: true,
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'style/': path.resolve(__dirname, './src/style')
    }
  },
});

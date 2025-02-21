import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables.scss";`, // ✅ Auto-import SCSS variables
      },
    },
  },
  server: {
    hmr: {
      overlay: false, // ✅ Disables Vite's WebSocket error overlay (to debug WebSocket errors)
    },
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
    open: './index.html',
  },
});

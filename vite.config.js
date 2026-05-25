import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:   ['react', 'react-dom'],
          router:   ['react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth'],
          toast:    ['react-toastify'],
          onesignal:['react-onesignal'],
        }
      }
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // ✅ retire console.log production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
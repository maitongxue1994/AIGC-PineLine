import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    // 本地无 .dev.vars/密钥，/api/* 由线上 Worker 处理——dev 时代理到线上，避免 404
    proxy: {
      '/api': {
        target: 'https://aigcpineline0419.mys2388212.workers.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          flow: ['@xyflow/react'],
        },
      },
    },
  },
})

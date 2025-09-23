import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 使用自定义域名时，资源基础路径应为根路径
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // icon
          if (id.includes('lucide-react')) {
            return 'lucide-react';
          }

          // 路由相关
          if (id.includes('react-router')) {
            return 'router';
          }

          // 状态管理
          if (id.includes('jotai')) {
            return 'state';
          }

          // UI组件库
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }

          // 拖拽相关
          if (id.includes('@dnd-kit')) {
            return 'dnd-kit';
          }

          // 图片裁剪
          if (id.includes('react-image-crop')) {
            return 'image-crop';
          }

          // 工具库
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority') || id.includes('lodash.debounce')) {
            return 'utils';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
}))

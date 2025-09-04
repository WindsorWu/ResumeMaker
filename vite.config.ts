import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '127.0.0.1', // 强制使用 IPv4
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React相关
          'react-vendor': ['react', 'react-dom'],

          // 路由相关
          'router': ['react-router-dom'],

          // 状态管理
          'state': ['jotai'],

          // UI组件库
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-slot'
          ],

          // 拖拽相关 (按需加载)
          'dnd-kit': [
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities'
          ],



          // 图片裁剪 (按需加载)
          'image-crop': ['react-image-crop'],

          // 工具库
          'utils': [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'lodash.debounce'
          ]
        }
      }
    },
    // 增大chunk大小警告阈值，因为我们已经进行了代码分割
    chunkSizeWarningLimit: 800
  }
})

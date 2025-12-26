import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub/Gitee Pages 部署时需要设置 base 路径
  base: process.env.GITHUB_PAGES || process.env.GITEE_PAGES ? '/order-menu/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 设置 chunk 大小警告阈值
    chunkSizeWarningLimit: 500,
    // Rollup 配置
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // React 核心库
          'react-vendor': ['react', 'react-dom'],
          // 动画库单独打包（较大）
          'framer-motion': ['framer-motion'],
          // 状态管理
          'zustand': ['zustand'],
          // 图标库
          'lucide': ['lucide-react'],
        },
        // 优化 chunk 文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // 根据文件类型分类存放
          if (/\.(png|jpe?g|svg|gif|webp|avif|ico)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(assetInfo.name || '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // 使用 esbuild 压缩（默认，无需额外安装）
    minify: 'esbuild',
    // 生成源码映射（生产环境可关闭）
    sourcemap: false,
    // 设置构建目标为现代浏览器
    target: 'es2020'
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'framer-motion', 'lucide-react']
  },
  // CSS 优化
  css: {
    devSourcemap: false
  }
})

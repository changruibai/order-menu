import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Gitee Pages 部署时需要设置 base 路径
  // 格式: /仓库名/  (请替换成你的 Gitee 仓库名)
  base: process.env.GITEE_PAGES ? '/order-menu/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})


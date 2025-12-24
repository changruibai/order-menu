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
    assetsDir: 'assets'
  }
})


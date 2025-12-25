<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-12-24 16:38:19
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-12-24 17:11:12
 * @FilePath: /order-menu/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 🍜 点餐 H5

一个简洁美观的点餐应用。

## ✨ 功能特点

- 📱 移动端优先的响应式设计
- 🛒 购物车功能
- 📝 下单备注
- 🔔 微信通知（通过 Server酱）
- 💾 本地存储（刷新不丢失购物车）

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置微信通知（可选）

1. 访问 [Server酱](https://sct.ftqq.com/) 并用微信扫码登录
2. 在「Key&API」页面获取你的 SendKey
3. 打开 `src/App.tsx`，找到 `NOTIFY_KEY` 变量
4. 将你的 SendKey 填入：

```typescript
const NOTIFY_KEY = 'SCTxxxxxxxxxxxxxxxx';  // 替换为你的 SendKey
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 即可看到应用。

### 4. 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录，可部署到任何静态托管服务。

## 📦 部署建议

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### GitHub Pages

1. 修改 `vite.config.ts` 添加 base 路径
2. 运行 `npm run build`
3. 将 `dist` 目录部署到 GitHub Pages

## 🍽️ 自定义菜单

编辑 `src/data/menu.ts` 文件来自定义你的菜单：

```typescript
{
  id: 'hongshaorou',
  name: '红烧肉',
  description: '肥而不腻，入口即化',
  image: 'https://images.unsplash.com/photo-xxx',  // 图片URL
  category: 'meat',
  tags: ['经典', '下饭']
}
```

### 图片来源推荐

- [Unsplash](https://unsplash.com/s/photos/chinese-food) - 免费高清图片
- [Pexels](https://www.pexels.com/search/chinese%20food/) - 免费图库
- 自己拍摄的照片

## 🛠️ 技术栈

- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (状态管理)
- Framer Motion (动画)
- Lucide React (图标)

## 📄 License

MIT



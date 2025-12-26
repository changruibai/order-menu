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
- ☁️ **云端同步**（通过 Supabase，可选）- 多设备共享菜单数据

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

### 3. 配置云端同步（Supabase，可选）

如果你希望菜单数据能够云端同步（多人/多设备共享），需要配置 Supabase：

#### 3.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 选择组织、填写项目名称和数据库密码
4. 等待项目创建完成（约1-2分钟）

#### 3.2 创建数据库表

1. 进入项目 Dashboard，点击左侧 "SQL Editor"
2. 复制 `supabase-setup.sql` 文件中的内容
3. 粘贴到 SQL Editor 中并运行

#### 3.3 创建存储桶（用于图片上传）

1. 点击左侧 "Storage"
2. 点击 "New bucket" 创建新存储桶
3. 名称填写：`dish-images`
4. 勾选 "Public bucket" 使其公开访问
5. 点击 "Create bucket"

#### 3.4 获取 API 密钥

1. 点击左侧 "Project Settings" -> "API"
2. 复制 "Project URL" 和 "anon public" key

#### 3.5 配置环境变量

在项目根目录创建 `.env` 文件：

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ 注意：`.env` 文件包含敏感信息，不要提交到 Git 仓库

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 即可看到应用。

### 5. 构建生产版本

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



-- ===========================================
-- Supabase 数据库设置脚本
-- 在 Supabase Dashboard 的 SQL Editor 中运行此脚本
-- ===========================================

-- 1. 创建分类表
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🍽️',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建菜品表
CREATE TABLE IF NOT EXISTS dishes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  tags TEXT[] DEFAULT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_dishes_category_id ON dishes(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_dishes_sort_order ON dishes(sort_order);

-- 4. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 为分类表创建触发器
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 为菜品表创建触发器
DROP TRIGGER IF EXISTS update_dishes_updated_at ON dishes;
CREATE TRIGGER update_dishes_updated_at
  BEFORE UPDATE ON dishes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. 启用 Row Level Security (RLS)
-- 注意：这里设置为公开访问，如果需要用户认证，请修改策略
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "允许公开读取分类" ON categories FOR SELECT USING (true);
CREATE POLICY "允许公开读取菜品" ON dishes FOR SELECT USING (true);

-- 允许所有人写入（如需限制，请修改为认证用户）
CREATE POLICY "允许公开插入分类" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "允许公开更新分类" ON categories FOR UPDATE USING (true);
CREATE POLICY "允许公开删除分类" ON categories FOR DELETE USING (true);

CREATE POLICY "允许公开插入菜品" ON dishes FOR INSERT WITH CHECK (true);
CREATE POLICY "允许公开更新菜品" ON dishes FOR UPDATE USING (true);
CREATE POLICY "允许公开删除菜品" ON dishes FOR DELETE USING (true);

-- ===========================================
-- 存储桶设置（需要在 Storage 页面手动创建）
-- ===========================================
-- 
-- 1. 进入 Supabase Dashboard -> Storage
-- 2. 点击 "New bucket" 创建新存储桶
-- 3. 名称设为: dish-images
-- 4. 勾选 "Public bucket" 使其公开访问
-- 5. 点击 "Create bucket"
--
-- 或者运行以下 SQL（需要在 SQL Editor 中运行）：

INSERT INTO storage.buckets (id, name, public)
VALUES ('dish-images', 'dish-images', true)
ON CONFLICT (id) DO NOTHING;

-- 设置存储桶的访问策略
CREATE POLICY "允许公开读取图片" ON storage.objects
  FOR SELECT USING (bucket_id = 'dish-images');

CREATE POLICY "允许公开上传图片" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'dish-images');

CREATE POLICY "允许公开删除图片" ON storage.objects
  FOR DELETE USING (bucket_id = 'dish-images');

-- ===========================================
-- 完成！
-- ===========================================
-- 接下来：
-- 1. 在项目根目录创建 .env 文件
-- 2. 添加以下内容（替换为你的实际值）：
--    VITE_SUPABASE_URL=https://your-project-id.supabase.co
--    VITE_SUPABASE_ANON_KEY=your-anon-key-here
-- 3. 重启开发服务器


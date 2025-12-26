import { createClient } from '@supabase/supabase-js';

// ⚠️ 配置你的 Supabase 项目信息
// 获取方式：
// 1. 访问 https://supabase.com 创建项目
// 2. 在项目设置 -> API 中获取 URL 和 anon key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase 未配置，请在 .env 文件中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 检查 Supabase 是否已配置
export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};


/**
 * 获取静态资源的完整 URL
 * 处理 Vite base 路径问题
 */
export const getAssetUrl = (path: string): string => {
  // 如果是外部链接（http/https），直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 获取 Vite 的 base URL
  const base = import.meta.env.BASE_URL || '/';
  
  // 如果路径以 / 开头，移除它以避免重复
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // 确保 base 以 / 结尾
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  
  return `${cleanBase}${cleanPath}`;
};


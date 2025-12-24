// 图片缓存管理工具

// 内存缓存 - 存储已加载的图片
const imageCache = new Map<string, HTMLImageElement>();

// 加载状态追踪
const loadingPromises = new Map<string, Promise<void>>();

/**
 * 预加载单张图片
 */
export const preloadImage = (src: string): Promise<void> => {
  // 如果已经缓存，直接返回
  if (imageCache.has(src)) {
    return Promise.resolve();
  }

  // 如果正在加载，返回现有的 Promise
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }

  // 创建新的加载 Promise
  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      imageCache.set(src, img);
      loadingPromises.delete(src);
      resolve();
    };

    img.onerror = () => {
      loadingPromises.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });

  loadingPromises.set(src, promise);
  return promise;
};

/**
 * 批量预加载图片
 */
export const preloadImages = async (sources: string[]): Promise<void> => {
  const promises = sources.map(src => 
    preloadImage(src).catch(err => {
      console.warn('Image preload failed:', err);
    })
  );
  await Promise.all(promises);
};

/**
 * 检查图片是否已缓存
 */
export const isImageCached = (src: string): boolean => {
  return imageCache.has(src);
};

/**
 * 获取缓存的图片
 */
export const getCachedImage = (src: string): HTMLImageElement | undefined => {
  return imageCache.get(src);
};

/**
 * 清除图片缓存
 */
export const clearImageCache = (): void => {
  imageCache.clear();
};

/**
 * 获取缓存大小
 */
export const getCacheSize = (): number => {
  return imageCache.size;
};

// 将菜单数据中的图片存入 localStorage（URL 缓存）
const MENU_IMAGES_KEY = 'menu_images_cache';
const CACHE_VERSION_KEY = 'menu_images_version';
const CURRENT_VERSION = '1.0.0';

/**
 * 初始化本地存储缓存
 */
export const initLocalStorageCache = (): void => {
  const version = localStorage.getItem(CACHE_VERSION_KEY);
  if (version !== CURRENT_VERSION) {
    localStorage.removeItem(MENU_IMAGES_KEY);
    localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
  }
};

/**
 * 将图片转为 base64 并缓存到 localStorage
 */
export const cacheImageToLocalStorage = async (src: string): Promise<string> => {
  try {
    const cache = JSON.parse(localStorage.getItem(MENU_IMAGES_KEY) || '{}');
    
    if (cache[src]) {
      return cache[src];
    }

    const response = await fetch(src);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        cache[src] = base64;
        try {
          localStorage.setItem(MENU_IMAGES_KEY, JSON.stringify(cache));
        } catch (e) {
          // localStorage 满了，清理旧缓存
          console.warn('LocalStorage full, clearing old cache');
        }
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return src;
  }
};

/**
 * 从 localStorage 获取缓存的图片
 */
export const getImageFromLocalStorage = (src: string): string | null => {
  try {
    const cache = JSON.parse(localStorage.getItem(MENU_IMAGES_KEY) || '{}');
    return cache[src] || null;
  } catch {
    return null;
  }
};


import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getAssetUrl } from '../utils/getAssetUrl';

interface CachedImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
  // 是否启用懒加载，默认启用
  lazy?: boolean;
  // 预加载距离（距离视口多少像素时开始加载）
  rootMargin?: string;
  // 是否是关键图片（首屏），关键图片优先加载
  priority?: boolean;
}

// 全局图片缓存 Set - 记录已成功加载过的图片URL
const loadedImages = new Set<string>();

// 检查浏览器是否支持 WebP
const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// 缓存 WebP 支持状态
let webPSupported: boolean | null = null;
const getWebPSupport = async (): Promise<boolean> => {
  if (webPSupported === null) {
    webPSupported = await checkWebPSupport();
  }
  return webPSupported;
};

// 同步检查（用于首次渲染，假设支持）
const supportsWebP = (): boolean => {
  return webPSupported ?? true;
};

/**
 * 获取 WebP 版本的图片路径
 * /images/dishes/xxx.jpeg -> /images/dishes/xxx.webp
 */
const getWebPPath = (src: string): string => {
  // 只处理本地图片
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // 替换扩展名为 .webp
  return src.replace(/\.(jpe?g|png|gif)$/i, '.webp');
};


const CachedImage: React.FC<CachedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  onError,
  lazy = true,
  rootMargin = '200px', // 提前 200px 开始加载
  priority = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 处理 base URL，优先使用 WebP
  const resolvedSrc = useMemo(() => {
    const webpPath = supportsWebP() ? getWebPPath(src) : src;
    return getAssetUrl(webpPath);
  }, [src]);

  // 原始格式作为 fallback
  const fallbackSrc = useMemo(() => getAssetUrl(src), [src]);
  
  // 检查是否已缓存（使用 useMemo 确保组件重渲染时能正确读取最新状态）
  const isAlreadyCached = useMemo(() => loadedImages.has(resolvedSrc), [resolvedSrc]);
  
  // 关键图片不启用懒加载
  const shouldLazyLoad = lazy && !priority && !isAlreadyCached;
  
  const [isInView, setIsInView] = useState(!shouldLazyLoad);
  // 如果已缓存，直接设为已加载状态，避免显示骨架屏
  const [isLoaded, setIsLoaded] = useState(isAlreadyCached);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // 初始化时检查 WebP 支持
  useEffect(() => {
    getWebPSupport();
  }, []);

  // Intersection Observer 懒加载
  useEffect(() => {
    if (!shouldLazyLoad) return;
    
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin,
        threshold: 0
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldLazyLoad, rootMargin]);

  // 图片加载成功回调
  const handleLoad = useCallback(() => {
    loadedImages.add(resolvedSrc);
    setIsLoaded(true);
  }, [resolvedSrc]);

  const handleError = useCallback(() => {
    // 如果 WebP 加载失败，尝试原始格式
    if (!useFallback && resolvedSrc !== fallbackSrc) {
      console.log('WebP 加载失败，尝试原始格式:', fallbackSrc);
      setUseFallback(true);
      return;
    }
    setHasError(true);
    onError?.();
  }, [onError, useFallback, resolvedSrc, fallbackSrc]);

  // 最终使用的图片源
  const currentSrc = useFallback ? fallbackSrc : resolvedSrc;

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
        <span className="text-4xl">🍽️</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 骨架屏/加载占位 - 只在未加载时显示 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      
      {/* 实际图片 - 只有进入视口才渲染 */}
      {isInView && (
        <picture>
          {/* WebP 格式优先（如果支持） */}
          {!useFallback && supportsWebP() && (
            <source
              srcSet={currentSrc}
              type="image/webp"
            />
          )}
          <img
            src={currentSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            // 关键图片使用 eager 加载
            loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
            decoding={priority ? 'sync' : 'async'}
            // 关键图片设置高优先级
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
      )}
    </div>
  );
};

export default React.memo(CachedImage);

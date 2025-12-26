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
}

// 全局图片缓存 Set
const loadedImages = new Set<string>();

const CachedImage: React.FC<CachedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  onError,
  lazy = true,
  rootMargin = '200px' // 提前 200px 开始加载
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 处理 base URL
  const resolvedSrc = useMemo(() => getAssetUrl(src), [src]);
  
  // 检查是否已缓存
  const isAlreadyCached = loadedImages.has(resolvedSrc);
  
  const [isInView, setIsInView] = useState(!lazy || isAlreadyCached);
  const [isLoaded, setIsLoaded] = useState(isAlreadyCached);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer 懒加载
  useEffect(() => {
    if (!lazy || isAlreadyCached) return;
    
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
  }, [lazy, rootMargin, isAlreadyCached]);

  // 图片加载逻辑
  useEffect(() => {
    if (!isInView || isAlreadyCached) return;

    setIsLoaded(false);
    setHasError(false);

    const img = new Image();
    
    img.onload = () => {
      loadedImages.add(resolvedSrc);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
    };

    img.src = resolvedSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [resolvedSrc, isInView, isAlreadyCached]);

  const handleLoad = useCallback(() => {
    loadedImages.add(resolvedSrc);
    setIsLoaded(true);
  }, [resolvedSrc]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

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
        <img
          src={resolvedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          // 使用原生懒加载作为 fallback
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default React.memo(CachedImage);

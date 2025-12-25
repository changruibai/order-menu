import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { isImageCached, preloadImage } from '../utils/imageCache';
import { getAssetUrl } from '../utils/getAssetUrl';

interface CachedImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
}

const CachedImage: React.FC<CachedImageProps> = ({ src, alt, className = '', onError }) => {
  // 处理 base URL
  const resolvedSrc = useMemo(() => getAssetUrl(src), [src]);
  
  const [isLoaded, setIsLoaded] = useState(() => isImageCached(resolvedSrc));
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    // 如果图片已缓存，直接显示
    if (isImageCached(resolvedSrc)) {
      setIsLoaded(true);
      setCurrentSrc(resolvedSrc);
      return;
    }

    // 预加载图片
    setIsLoaded(false);
    setHasError(false);
    
    preloadImage(resolvedSrc)
      .then(() => {
        setCurrentSrc(resolvedSrc);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
      });
  }, [resolvedSrc]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

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
    <div className={`relative ${className}`}>
      {/* 骨架屏/加载占位 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* 实际图片 */}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default React.memo(CachedImage);


import { useEffect, useRef } from 'react';
import { preloadImages } from '../utils/imageCache';
import { getAssetUrl } from '../utils/getAssetUrl';
import { Dish } from '../types';

/**
 * 预加载指定菜品列表的图片
 */
export const useImagePreloader = (dishes: Dish[]) => {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const imagesToPreload = dishes
      .map(dish => getAssetUrl(dish.image))
      .filter(src => !preloadedRef.current.has(src));

    if (imagesToPreload.length > 0) {
      preloadImages(imagesToPreload).then(() => {
        imagesToPreload.forEach(src => preloadedRef.current.add(src));
      });
    }
  }, [dishes]);
};

/**
 * 预加载所有菜单图片（用于初始化）
 */
export const useMenuImagePreloader = (allDishes: Dish[]) => {
  const hasPreloaded = useRef(false);

  useEffect(() => {
    if (hasPreloaded.current) return;
    hasPreloaded.current = true;

    // 分批加载，避免阻塞
    const batchSize = 6;
    const images = allDishes.map(dish => getAssetUrl(dish.image));
    
    const loadBatch = async (startIndex: number) => {
      const batch = images.slice(startIndex, startIndex + batchSize);
      if (batch.length === 0) return;
      
      await preloadImages(batch);
      
      // 延迟加载下一批
      setTimeout(() => loadBatch(startIndex + batchSize), 100);
    };

    loadBatch(0);
  }, [allDishes]);
};


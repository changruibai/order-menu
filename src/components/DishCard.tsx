import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
import { Dish } from '../types';
import { useCartStore } from '../store/cartStore';
import CachedImage from './CachedImage';

interface DishCardProps {
  dish: Dish;
  index: number;
  onEdit?: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, index, onEdit }) => {
  const { items, addItem, removeItem } = useCartStore();
  const [showAdded, setShowAdded] = useState(false);
  
  const cartItem = items.find(item => item.dish.id === dish.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 800);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(dish.id);
  };

  const handleCardClick = () => {
    onEdit?.(dish);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-lg transition-shadow duration-300 cursor-pointer active:scale-[0.98]"
    >
      {/* 图片区域 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <CachedImage
          src={dish.image}
          alt={dish.name}
          className="w-full h-full transition-transform duration-500"
        />
        
        {/* 标签 */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {dish.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs font-medium bg-primary-500/90 text-white rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 已添加动画 */}
        <AnimatePresence>
          {showAdded && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-primary-500/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-primary-500" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 信息区域 */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{dish.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{dish.description}</p>
          </div>
          
          {/* 数量控制 */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="popLayout">
              {quantity > 0 && (
                <>
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={handleRemove}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-6 text-center font-semibold text-primary-600"
                  >
                    {quantity}
                  </motion.span>
                </>
              )}
            </AnimatePresence>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(DishCard);


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronUp } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartBarProps {
  onCartClick: () => void;
  onCheckout: () => void;
}

const CartBar: React.FC<CartBarProps> = ({ onCartClick, onCheckout }) => {
  const { items, getTotalCount } = useCartStore();
  const totalCount = getTotalCount();

  if (totalCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          layout
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-3 flex items-center gap-3 shadow-2xl"
        >
          {/* 购物车图标和数量 */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="relative flex items-center justify-center w-12 h-12 bg-primary-500 rounded-xl"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            <motion.span
              key={totalCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {totalCount}
            </motion.span>
            <ChevronUp className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-gray-400 animate-bounce" />
          </motion.button>

          {/* 已选菜品预览 */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {items.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.dish.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative flex-shrink-0"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    {item.quantity > 1 && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length > 5 && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                  +{items.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* 下单按钮 */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCheckout}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30"
          >
            下单
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(CartBar);


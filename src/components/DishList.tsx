import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Dish } from '../types';
import DishCard from './DishCard';

interface DishListProps {
  dishes: Dish[];
  categoryName: string;
  onEditDish?: (dish: Dish) => void;
  onAddDish?: () => void;
}

const DishList: React.FC<DishListProps> = ({ dishes, categoryName, onEditDish, onAddDish }) => {
  return (
    <div className="px-4 py-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between mb-3"
      >
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-300 rounded-full" />
          {categoryName}
        </h2>
        
        {/* 新增菜品按钮 */}
        {onAddDish && (
          <button
            onClick={onAddDish}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium hover:bg-primary-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增
          </button>
        )}
      </motion.div>
      
      <div className="grid grid-cols-2 gap-3">
        {dishes.map((dish, index) => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            index={index} 
            onEdit={onEditDish}
          />
        ))}
        
        {/* 空状态 - 添加菜品卡片 */}
        {dishes.length === 0 && onAddDish && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onAddDish}
            className="aspect-[4/3] bg-white/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-all"
          >
            <Plus className="w-10 h-10 mb-2" />
            <span className="text-sm font-medium">添加第一道菜品</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default React.memo(DishList);



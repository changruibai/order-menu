import React from 'react';
import { motion } from 'framer-motion';
import { Dish } from '../types';
import DishCard from './DishCard';

interface DishListProps {
  dishes: Dish[];
  categoryName: string;
}

const DishList: React.FC<DishListProps> = ({ dishes, categoryName }) => {
  return (
    <div className="px-4 py-4">
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"
      >
        <span className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-300 rounded-full" />
        {categoryName}
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-3">
        {dishes.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} index={index} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(DishList);


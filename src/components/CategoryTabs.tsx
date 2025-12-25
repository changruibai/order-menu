import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="sticky top-[52px] z-30 glass border-b border-primary-100">
      <div className="flex overflow-x-auto py-3 px-2 gap-2 scrollbar-hide">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap
              text-sm font-medium transition-all duration-300
              ${activeCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white/60 text-gray-600 hover:bg-white hover:shadow-md'
              }
            `}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CategoryTabs);



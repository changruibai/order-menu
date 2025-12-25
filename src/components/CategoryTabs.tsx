import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Settings } from 'lucide-react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onAddCategory?: () => void;
  onEditCategory?: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  onAddCategory,
  onEditCategory
}) => {
  const handleCategoryClick = (category: Category) => {
    if (activeCategory === category.id && onEditCategory) {
      // 如果点击已选中的分类，则进入编辑
      onEditCategory(category);
    } else {
      // 否则切换分类
      onCategoryChange(category.id);
    }
  };

  return (
    <div className="sticky top-[52px] z-30 glass border-b border-primary-100">
      <div className="flex overflow-x-auto py-3 px-2 gap-2 scrollbar-hide">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleCategoryClick(category)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap
              text-sm font-medium transition-all duration-300 relative
              ${activeCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white/60 text-gray-600 hover:bg-white hover:shadow-md'
              }
            `}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
            {/* 编辑提示图标 - 仅在选中时显示 */}
            {activeCategory === category.id && onEditCategory && (
              <Settings className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            )}
          </motion.button>
        ))}
        
        {/* 添加分类按钮 */}
        {onAddCategory && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categories.length * 0.05 }}
            onClick={onAddCategory}
            className="flex items-center gap-1 px-3 py-2 rounded-full whitespace-nowrap text-sm font-medium bg-white/60 text-gray-500 hover:bg-white hover:text-primary-500 hover:shadow-md transition-all duration-300 border-2 border-dashed border-gray-200 hover:border-primary-300"
          >
            <Plus className="w-4 h-4" />
            <span>添加</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default React.memo(CategoryTabs);



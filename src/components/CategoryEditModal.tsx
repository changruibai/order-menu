import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2 } from 'lucide-react';
import { Category } from '../types';
import { useMenuStore } from '../store/menuStore';

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null; // null 表示新增模式
}

// 常用 emoji 图标预设
const PRESET_ICONS = [
  '🥩', '🦐', '🥬', '🍲', '🍚', '🍳',
  '🥗', '🍜', '🍝', '🍕', '🍔', '🌮',
  '🥟', '🍱', '🍣', '🍤', '🥘', '🍛',
  '🥧', '🍰', '🧁', '🍮', '🍩', '🍪',
  '☕', '🍵', '🧃', '🥤', '🍺', '🍷'
];

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  onClose,
  category
}) => {
  const { addCategory, updateCategory, deleteCategory, categories } = useMenuStore();
  
  const isEditMode = !!category;
  
  // 表单状态
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🍽️');
  
  // 初始化表单
  useEffect(() => {
    if (isOpen) {
      if (category) {
        setName(category.name);
        setIcon(category.icon);
      } else {
        setName('');
        setIcon('🍽️');
      }
    }
  }, [isOpen, category]);
  
  // 生成唯一 ID
  const generateId = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `cat_${timestamp}_${random}`;
  }, []);
  
  // 保存分类
  const handleSave = useCallback(() => {
    if (!name.trim()) {
      alert('请填写分类名称');
      return;
    }
    
    const categoryData: Category = {
      id: category?.id || generateId(),
      name: name.trim(),
      icon,
      dishes: category?.dishes || []
    };
    
    if (isEditMode) {
      updateCategory(category.id, categoryData);
    } else {
      addCategory(categoryData);
    }
    
    onClose();
  }, [name, icon, category, isEditMode, generateId, updateCategory, addCategory, onClose]);
  
  // 删除分类
  const handleDelete = useCallback(() => {
    if (!category) return;
    
    // 检查分类下是否有菜品
    if (category.dishes.length > 0) {
      alert(`该分类下有 ${category.dishes.length} 个菜品，请先移除或删除菜品后再删除分类`);
      return;
    }
    
    // 检查是否是最后一个分类
    if (categories.length <= 1) {
      alert('至少保留一个分类');
      return;
    }
    
    if (confirm(`确定要删除分类「${category.name}」吗？`)) {
      deleteCategory(category.id);
      onClose();
    }
  }, [category, categories.length, deleteCategory, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* 弹窗内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[400px] md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-800">
                {isEditMode ? '编辑分类' : '新增分类'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* 表单内容 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* 图标选择 */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  分类图标
                </label>
                
                {/* 当前选中的图标 */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-4xl">
                    {icon}
                  </div>
                  <div className="text-sm text-gray-500">
                    点击下方图标选择
                  </div>
                </div>
                
                {/* 图标列表 */}
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_ICONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setIcon(emoji)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                        icon === emoji
                          ? 'bg-primary-500 scale-110 shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 active:scale-95'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 分类名称 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  分类名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入分类名称"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              
              {/* 预览 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  预览效果
                </label>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/30">
                    <span className="text-base">{icon}</span>
                    <span className="text-sm font-medium">{name || '分类名称'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部操作栏 */}
            <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              {isEditMode && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              )}
              <div className="flex-1" />
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 shadow-lg shadow-primary-500/30 transition-all"
              >
                <Save className="w-4 h-4" />
                保存
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CategoryEditModal);


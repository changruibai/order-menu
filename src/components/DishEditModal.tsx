import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Image, Plus, Tag, Camera, Link } from 'lucide-react';
import { Dish, Category } from '../types';
import { useMenuStore } from '../store/menuStore';
import CachedImage from './CachedImage';

interface DishEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish?: Dish | null; // null 表示新增模式
  defaultCategory?: string;
}

// 常用标签预设
const PRESET_TAGS = [
  '经典', '人气', '下饭', '快手', '清淡', '健康',
  '微辣', '中辣', '麻辣', '甜口', '酥脆', '鲜美',
  '素食', '低油', '凉菜', '热菜', '主食'
];

const DishEditModal: React.FC<DishEditModalProps> = ({
  isOpen,
  onClose,
  dish,
  defaultCategory
}) => {
  const { categories, addDish, updateDish, deleteDish } = useMenuStore();
  
  const isEditMode = !!dish;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 表单状态
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  
  // 初始化表单
  useEffect(() => {
    if (isOpen) {
      if (dish) {
        setName(dish.name);
        setDescription(dish.description);
        setImage(dish.image);
        setCategory(dish.category);
        setTags(dish.tags || []);
      } else {
        setName('');
        setDescription('');
        setImage('');
        setCategory(defaultCategory || categories[0]?.id || '');
        setTags([]);
      }
      setNewTag('');
      setShowTagInput(false);
      setImagePreviewError(false);
      setShowUrlInput(false);
    }
  }, [isOpen, dish, defaultCategory, categories]);
  
  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    
    // 检查文件大小（限制 5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }
    
    // 将图片转为 base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);
      setImagePreviewError(false);
    };
    reader.readAsDataURL(file);
    
    // 清空 input 以便可以重复选择同一文件
    e.target.value = '';
  }, []);
  
  // 触发文件选择
  const handleSelectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  // 生成唯一 ID
  const generateId = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `dish_${timestamp}_${random}`;
  }, []);
  
  // 添加标签
  const handleAddTag = useCallback((tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
    }
    setNewTag('');
    setShowTagInput(false);
  }, [tags]);
  
  // 移除标签
  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);
  
  // 保存菜品
  const handleSave = useCallback(() => {
    if (!name.trim() || !category) {
      alert('请填写菜品名称和选择分类');
      return;
    }
    
    const dishData: Dish = {
      id: dish?.id || generateId(),
      name: name.trim(),
      description: description.trim(),
      image: image.trim() || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop',
      category,
      tags: tags.length > 0 ? tags : undefined
    };
    
    if (isEditMode) {
      updateDish(dish.id, dishData);
    } else {
      addDish(dishData);
    }
    
    onClose();
  }, [name, description, image, category, tags, dish, isEditMode, generateId, updateDish, addDish, onClose]);
  
  // 删除菜品
  const handleDelete = useCallback(() => {
    if (dish && confirm(`确定要删除「${dish.name}」吗？`)) {
      deleteDish(dish.id);
      onClose();
    }
  }, [dish, deleteDish, onClose]);
  
  // 图片 URL 变化时重置错误状态
  const handleImageChange = useCallback((url: string) => {
    setImage(url);
    setImagePreviewError(false);
  }, []);
  
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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                {isEditMode ? '编辑菜品' : '新增菜品'}
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
              {/* 隐藏的文件输入 */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {/* 图片预览 */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4" />
                  菜品图片
                </label>
                
                {/* 图片预览区域 */}
                <div 
                  onClick={handleSelectFile}
                  className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {image && !imagePreviewError ? (
                    <>
                      <CachedImage
                        src={image}
                        alt="菜品预览"
                        className="w-full h-full"
                        onError={() => setImagePreviewError(true)}
                      />
                      {/* 点击更换提示 */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 active:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="text-white text-center">
                          <Camera className="w-8 h-8 mx-auto mb-1" />
                          <span className="text-sm">点击更换图片</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <Camera className="w-12 h-12 mb-2" />
                      <span className="text-sm font-medium">点击选择图片</span>
                      <span className="text-xs mt-1">支持 jpg、png、webp 格式</span>
                    </div>
                  )}
                </div>
                
                {/* URL 输入切换 */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-500 transition-colors"
                  >
                    <Link className="w-3.5 h-3.5" />
                    {showUrlInput ? '收起 URL 输入' : '使用图片链接'}
                  </button>
                </div>
                
                {/* URL 输入框 */}
                {showUrlInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="text"
                      value={image.startsWith('data:') ? '' : image}
                      onChange={(e) => handleImageChange(e.target.value)}
                      placeholder="输入图片 URL（如 https://... 或 /images/dishes/xxx.jpg）"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* 菜品名称 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  菜品名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入菜品名称"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              
              {/* 菜品描述 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  菜品描述
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入菜品描述"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                />
              </div>
              
              {/* 分类选择 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  所属分类 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: Category) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        category === cat.id
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 标签 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4" />
                  菜品标签
                </label>
                
                {/* 已选标签 */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="w-4 h-4 rounded-full bg-primary-200 flex items-center justify-center hover:bg-primary-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  
                  {/* 添加标签按钮 */}
                  {showTagInput ? (
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTag(newTag);
                        } else if (e.key === 'Escape') {
                          setShowTagInput(false);
                          setNewTag('');
                        }
                      }}
                      onBlur={() => {
                        if (newTag.trim()) {
                          handleAddTag(newTag);
                        } else {
                          setShowTagInput(false);
                        }
                      }}
                      placeholder="输入标签"
                      autoFocus
                      className="px-3 py-1 rounded-full border border-primary-300 bg-white text-gray-800 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-primary-100 w-24"
                    />
                  ) : (
                    <button
                      onClick={() => setShowTagInput(true)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      添加
                    </button>
                  )}
                </div>
                
                {/* 预设标签 */}
                <div className="pt-2">
                  <p className="text-xs text-gray-400 mb-2">常用标签：</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TAGS.filter(tag => !tags.includes(tag)).slice(0, 12).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-xs hover:bg-gray-100 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部操作栏 */}
            <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
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

export default React.memo(DishEditModal);


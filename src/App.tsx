import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import DishList from './components/DishList';
import CartBar from './components/CartBar';
import CartDrawer from './components/CartDrawer';
import OrderPage from './components/OrderPage';
import DishEditModal from './components/DishEditModal';
import CategoryEditModal from './components/CategoryEditModal';
import { useMenuStore } from './store/menuStore';
import { preloadImages } from './utils/imageCache';
import { getAssetUrl } from './utils/getAssetUrl';
import { Dish, Category } from './types';

// ⚠️ 配置你的 Server酱 SendKey
// 获取方式：https://sct.ftqq.com/
// 登录后在「Key&API」页面获取 SendKey
const NOTIFY_KEY = 'SCT306887T6WL9sVkPiFnCTpzEivB2xIbZ';  // 例如: 'SCTxxxxxxxxxxxxxxxx'

function App() {
  const { categories, getAllDishes } = useMenuStore();
  
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  
  // 菜品编辑弹窗状态
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  
  // 分类编辑弹窗状态
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const currentCategory = categories.find(c => c.id === activeCategory);

  // 预加载所有菜品图片
  useEffect(() => {
    const allDishes = getAllDishes();
    const images = allDishes.map(dish => getAssetUrl(dish.image));
    
    // 分批预加载，优先加载当前分类
    const currentImages = currentCategory?.dishes.map(d => getAssetUrl(d.image)) || [];
    const otherImages = images.filter(img => !currentImages.includes(img));
    
    // 先加载当前分类的图片
    preloadImages(currentImages).then(() => {
      // 然后在后台加载其他图片
      const batchSize = 6;
      const loadBatch = (index: number) => {
        const batch = otherImages.slice(index, index + batchSize);
        if (batch.length === 0) return;
        preloadImages(batch).then(() => {
          setTimeout(() => loadBatch(index + batchSize), 100);
        });
      };
      loadBatch(0);
    });
  }, [getAllDishes, currentCategory]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsOrderOpen(true);
  }, []);

  const handleOrderClose = useCallback(() => {
    setIsOrderOpen(false);
  }, []);

  // 编辑菜品
  const handleEditDish = useCallback((dish: Dish) => {
    setEditingDish(dish);
    setIsEditModalOpen(true);
  }, []);

  // 新增菜品
  const handleAddDish = useCallback(() => {
    setEditingDish(null);
    setIsEditModalOpen(true);
  }, []);

  // 关闭编辑弹窗
  const handleEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingDish(null);
  }, []);

  // 编辑分类
  const handleEditCategory = useCallback((category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  }, []);

  // 新增分类
  const handleAddCategory = useCallback(() => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  }, []);

  // 关闭分类编辑弹窗
  const handleCategoryModalClose = useCallback(() => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
      />

      {currentCategory && (
        <DishList
          dishes={currentCategory.dishes}
          categoryName={currentCategory.name}
          onEditDish={handleEditDish}
          onAddDish={handleAddDish}
        />
      )}

      <AnimatePresence>
        <CartBar
          onCartClick={handleCartClick}
          onCheckout={handleCheckout}
        />
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCartClose}
      />

      <OrderPage
        isOpen={isOrderOpen}
        onClose={handleOrderClose}
        notifyKey={NOTIFY_KEY}
      />

      {/* 菜品编辑弹窗 */}
      <DishEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        dish={editingDish}
        defaultCategory={activeCategory}
      />

      {/* 分类编辑弹窗 */}
      <CategoryEditModal
        isOpen={isCategoryModalOpen}
        onClose={handleCategoryModalClose}
        category={editingCategory}
      />

      {/* 未配置通知提示 */}
      {!NOTIFY_KEY && (
        <div className="fixed top-16 left-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 z-30">
          💡 提示：在 <code className="bg-yellow-100 px-1 rounded">App.tsx</code> 中配置 NOTIFY_KEY 以启用微信通知
        </div>
      )}
    </div>
  );
}

export default App;


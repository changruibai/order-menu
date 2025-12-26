import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import DishList from './components/DishList';
import CartBar from './components/CartBar';
import { useMenuStore } from './store/menuStore';
import { Dish, Category } from './types';
import { isSupabaseConfigured } from './lib/supabase';

// 懒加载非首屏必要的组件
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const OrderPage = lazy(() => import('./components/OrderPage'));
const DishEditModal = lazy(() => import('./components/DishEditModal'));
const CategoryEditModal = lazy(() => import('./components/CategoryEditModal'));

// ⚠️ 配置你的 Server酱 SendKey
// 获取方式：https://sct.ftqq.com/
// 登录后在「Key&API」页面获取 SendKey
const NOTIFY_KEY = 'SCT306887T6WL9sVkPiFnCTpzEivB2xIbZ';  // 例如: 'SCTxxxxxxxxxxxxxxxx'

interface AppProps {
  onReady?: () => void;
}

function App({ onReady }: AppProps) {
  const { categories, initialize, isLoading, isSyncing, isInitialized } = useMenuStore();
  
  // 初始化 Supabase 数据
  useEffect(() => {
    initialize();
  }, [initialize]);

  // 当初始化完成后通知外部
  useEffect(() => {
    if (isInitialized && !isLoading && onReady) {
      onReady();
    }
  }, [isInitialized, isLoading, onReady]);
  
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  
  // 菜品编辑弹窗状态
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  
  // 分类编辑弹窗状态
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // 更新 activeCategory 当 categories 变化时
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCategory)) {
      setActiveCategory(categories[0]?.id || '');
    }
  }, [categories, activeCategory]);

  const currentCategory = categories.find(c => c.id === activeCategory);

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

  // 懒加载组件的 fallback
  const ModalFallback = () => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

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

      {/* 懒加载的模态框组件 */}
      <Suspense fallback={<ModalFallback />}>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={handleCartClose}
          />
        )}
      </Suspense>

      <Suspense fallback={<ModalFallback />}>
        {isOrderOpen && (
          <OrderPage
            isOpen={isOrderOpen}
            onClose={handleOrderClose}
            notifyKey={NOTIFY_KEY}
          />
        )}
      </Suspense>

      {/* 菜品编辑弹窗 */}
      <Suspense fallback={<ModalFallback />}>
        {isEditModalOpen && (
          <DishEditModal
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
            dish={editingDish}
            defaultCategory={activeCategory}
          />
        )}
      </Suspense>

      {/* 分类编辑弹窗 */}
      <Suspense fallback={<ModalFallback />}>
        {isCategoryModalOpen && (
          <CategoryEditModal
            isOpen={isCategoryModalOpen}
            onClose={handleCategoryModalClose}
            category={editingCategory}
          />
        )}
      </Suspense>

      {/* 加载状态 */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600">加载菜单中...</p>
          </div>
        </div>
      )}
      
      {/* 同步状态指示器 */}
      {isSyncing && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 z-50 shadow-lg">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          同步中...
        </div>
      )}

      {/* Supabase 未配置提示 */}
      {!isSupabaseConfigured() && (
        <div className="fixed top-16 left-4 right-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 z-30">
          ☁️ 提示：配置 Supabase 后可实现数据云端同步。在 <code className="bg-amber-100 px-1 rounded">.env</code> 中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
        </div>
      )}

      {/* 未配置通知提示 */}
      {!NOTIFY_KEY && isSupabaseConfigured() && (
        <div className="fixed top-16 left-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 z-30">
          💡 提示：在 <code className="bg-yellow-100 px-1 rounded">App.tsx</code> 中配置 NOTIFY_KEY 以启用微信通知
        </div>
      )}
    </div>
  );
}

export default App;

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import DishList from './components/DishList';
import CartBar from './components/CartBar';
import CartDrawer from './components/CartDrawer';
import OrderPage from './components/OrderPage';
import { menuData, getAllDishes } from './data/menu';
import { preloadImages } from './utils/imageCache';

// ⚠️ 配置你的 Server酱 SendKey
// 获取方式：https://sct.ftqq.com/
// 登录后在「Key&API」页面获取 SendKey
const NOTIFY_KEY = 'SCT306887T6WL9sVkPiFnCTpzEivB2xIbZ';  // 例如: 'SCTxxxxxxxxxxxxxxxx'

function App() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const currentCategory = menuData.find(c => c.id === activeCategory);

  // 预加载所有菜品图片
  useEffect(() => {
    const allDishes = getAllDishes();
    const images = allDishes.map(dish => dish.image);
    
    // 分批预加载，优先加载当前分类
    const currentImages = currentCategory?.dishes.map(d => d.image) || [];
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <CategoryTabs
        categories={menuData}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {currentCategory && (
        <DishList
          dishes={currentCategory.dishes}
          categoryName={currentCategory.name}
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


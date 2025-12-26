import { create } from 'zustand';
import { Dish, Category } from '../types';
import { menuData as initialMenuData } from '../data/menu';
import { menuService } from '../services/menuService';
import { isSupabaseConfigured } from '../lib/supabase';

interface MenuState {
  categories: Category[];
  isLoading: boolean;
  isInitialized: boolean;
  isSyncing: boolean;
  
  // 初始化（从 Supabase 加载数据）
  initialize: () => Promise<void>;
  
  // 菜品操作
  addDish: (dish: Dish) => Promise<void>;
  updateDish: (dishId: string, updatedDish: Partial<Dish>) => Promise<void>;
  deleteDish: (dishId: string) => Promise<void>;
  
  // 分类操作
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (categoryId: string, updatedCategory: Partial<Category>) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  
  // 获取数据
  getAllDishes: () => Dish[];
  getDishesByCategory: (categoryId: string) => Dish[];
  getDishById: (dishId: string) => Dish | undefined;
  getCategoryById: (categoryId: string) => Category | undefined;
  
  // 刷新数据
  refresh: () => Promise<void>;
  
  // 重置为初始数据
  resetToDefault: () => Promise<void>;
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  categories: initialMenuData,
  isLoading: false,
  isInitialized: false,
  isSyncing: false,
  
  // 初始化
  initialize: async () => {
    if (get().isInitialized) return;
    
    set({ isLoading: true });
    
    try {
      if (isSupabaseConfigured()) {
        const categories = await menuService.fetchAll();
        set({ categories, isInitialized: true });
      } else {
        // 未配置 Supabase，使用本地数据
        set({ categories: initialMenuData, isInitialized: true });
      }
    } catch (error) {
      console.error('初始化菜单数据失败:', error);
      set({ categories: initialMenuData, isInitialized: true });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 添加菜品
  addDish: async (dish: Dish) => {
    // 先更新本地状态（乐观更新）
    set((state) => {
      const categoryIndex = state.categories.findIndex(c => c.id === dish.category);
      if (categoryIndex === -1) return state;
      
      const newCategories = [...state.categories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        dishes: [...newCategories[categoryIndex].dishes, dish]
      };
      
      return { categories: newCategories };
    });
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.addDish(dish);
      set({ isSyncing: false });
      
      if (!success) {
        // 同步失败，回滚
        console.error('同步添加菜品失败');
      }
    }
  },
  
  // 更新菜品
  updateDish: async (dishId: string, updatedDish: Partial<Dish>) => {
    const state = get();
    
    // 找到原始菜品
    let oldDish: Dish | undefined;
    let oldCategoryId: string | undefined;
    for (const category of state.categories) {
      const dish = category.dishes.find(d => d.id === dishId);
      if (dish) {
        oldDish = dish;
        oldCategoryId = category.id;
        break;
      }
    }
    
    if (!oldDish) return;
    
    // 先更新本地状态（乐观更新）
    set((state) => {
      let newCategories = state.categories.map(category => {
        const dishIndex = category.dishes.findIndex(d => d.id === dishId);
        if (dishIndex === -1) return category;
        
        const newDish = { ...category.dishes[dishIndex], ...updatedDish };
        
        // 如果分类改变了，从当前分类移除
        if (updatedDish.category && updatedDish.category !== category.id) {
          return {
            ...category,
            dishes: category.dishes.filter(d => d.id !== dishId)
          };
        }
        
        const newDishes = [...category.dishes];
        newDishes[dishIndex] = newDish;
        
        return { ...category, dishes: newDishes };
      });
      
      // 如果分类改变了，添加到新分类
      if (updatedDish.category && oldCategoryId !== updatedDish.category) {
        const newDish = { ...oldDish, ...updatedDish };
        newCategories = newCategories.map(category => {
          if (category.id === updatedDish.category) {
            return {
              ...category,
              dishes: [...category.dishes, newDish as Dish]
            };
          }
          return category;
        });
      }
      
      return { categories: newCategories };
    });
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.updateDish(dishId, updatedDish);
      set({ isSyncing: false });
      
      if (!success) {
        console.error('同步更新菜品失败');
      }
    }
  },
  
  // 删除菜品
  deleteDish: async (dishId: string) => {
    // 先更新本地状态（乐观更新）
    set((state) => ({
      categories: state.categories.map(category => ({
        ...category,
        dishes: category.dishes.filter(d => d.id !== dishId)
      }))
    }));
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.deleteDish(dishId);
      set({ isSyncing: false });
      
      if (!success) {
        console.error('同步删除菜品失败');
      }
    }
  },
  
  // 添加分类
  addCategory: async (category: Category) => {
    // 先更新本地状态（乐观更新）
    set((state) => ({
      categories: [...state.categories, category]
    }));
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.addCategory(category);
      set({ isSyncing: false });
      
      if (!success) {
        console.error('同步添加分类失败');
      }
    }
  },
  
  // 更新分类
  updateCategory: async (categoryId: string, updatedCategory: Partial<Category>) => {
    // 先更新本地状态（乐观更新）
    set((state) => ({
      categories: state.categories.map(category =>
        category.id === categoryId
          ? { ...category, ...updatedCategory }
          : category
      )
    }));
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.updateCategory(categoryId, updatedCategory);
      set({ isSyncing: false });
      
      if (!success) {
        console.error('同步更新分类失败');
      }
    }
  },
  
  // 删除分类
  deleteCategory: async (categoryId: string) => {
    // 先更新本地状态（乐观更新）
    set((state) => ({
      categories: state.categories.filter(c => c.id !== categoryId)
    }));
    
    // 同步到 Supabase
    if (isSupabaseConfigured()) {
      set({ isSyncing: true });
      const success = await menuService.deleteCategory(categoryId);
      set({ isSyncing: false });
      
      if (!success) {
        console.error('同步删除分类失败');
      }
    }
  },
  
  // 获取所有菜品
  getAllDishes: () => {
    return get().categories.flatMap(category => category.dishes);
  },
  
  // 根据分类获取菜品
  getDishesByCategory: (categoryId: string) => {
    const category = get().categories.find(c => c.id === categoryId);
    return category?.dishes || [];
  },
  
  // 根据 ID 获取菜品
  getDishById: (dishId: string) => {
    for (const category of get().categories) {
      const dish = category.dishes.find(d => d.id === dishId);
      if (dish) return dish;
    }
    return undefined;
  },
  
  // 根据 ID 获取分类
  getCategoryById: (categoryId: string) => {
    return get().categories.find(c => c.id === categoryId);
  },
  
  // 刷新数据
  refresh: async () => {
    if (!isSupabaseConfigured()) return;
    
    set({ isLoading: true });
    try {
      const categories = await menuService.fetchAll();
      set({ categories });
    } catch (error) {
      console.error('刷新菜单数据失败:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 重置为初始数据
  resetToDefault: async () => {
    set({ categories: initialMenuData });
    
    if (isSupabaseConfigured()) {
      await menuService.initializeData();
    }
  }
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Dish, Category } from '../types';
import { menuData as initialMenuData } from '../data/menu';

interface MenuState {
  categories: Category[];
  
  // 菜品操作
  addDish: (dish: Dish) => void;
  updateDish: (dishId: string, updatedDish: Partial<Dish>) => void;
  deleteDish: (dishId: string) => void;
  
  // 分类操作
  addCategory: (category: Category) => void;
  updateCategory: (categoryId: string, updatedCategory: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  
  // 获取数据
  getAllDishes: () => Dish[];
  getDishesByCategory: (categoryId: string) => Dish[];
  getDishById: (dishId: string) => Dish | undefined;
  getCategoryById: (categoryId: string) => Category | undefined;
  
  // 重置为初始数据
  resetToDefault: () => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      categories: initialMenuData,
      
      addDish: (dish: Dish) => {
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
      },
      
      updateDish: (dishId: string, updatedDish: Partial<Dish>) => {
        set((state) => {
          const newCategories = state.categories.map(category => {
            const dishIndex = category.dishes.findIndex(d => d.id === dishId);
            if (dishIndex === -1) return category;
            
            const oldDish = category.dishes[dishIndex];
            const newDish = { ...oldDish, ...updatedDish };
            
            // 如果分类改变了，需要移动菜品
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
          if (updatedDish.category) {
            const oldCategory = state.categories.find(c => 
              c.dishes.some(d => d.id === dishId)
            );
            
            if (oldCategory && oldCategory.id !== updatedDish.category) {
              const oldDish = oldCategory.dishes.find(d => d.id === dishId);
              if (oldDish) {
                const newDish = { ...oldDish, ...updatedDish };
                const targetCategoryIndex = newCategories.findIndex(c => c.id === updatedDish.category);
                if (targetCategoryIndex !== -1) {
                  newCategories[targetCategoryIndex] = {
                    ...newCategories[targetCategoryIndex],
                    dishes: [...newCategories[targetCategoryIndex].dishes, newDish]
                  };
                }
              }
            }
          }
          
          return { categories: newCategories };
        });
      },
      
      deleteDish: (dishId: string) => {
        set((state) => ({
          categories: state.categories.map(category => ({
            ...category,
            dishes: category.dishes.filter(d => d.id !== dishId)
          }))
        }));
      },
      
      addCategory: (category: Category) => {
        set((state) => ({
          categories: [...state.categories, category]
        }));
      },
      
      updateCategory: (categoryId: string, updatedCategory: Partial<Category>) => {
        set((state) => ({
          categories: state.categories.map(category =>
            category.id === categoryId
              ? { ...category, ...updatedCategory }
              : category
          )
        }));
      },
      
      deleteCategory: (categoryId: string) => {
        set((state) => ({
          categories: state.categories.filter(c => c.id !== categoryId)
        }));
      },
      
      getAllDishes: () => {
        return get().categories.flatMap(category => category.dishes);
      },
      
      getDishesByCategory: (categoryId: string) => {
        const category = get().categories.find(c => c.id === categoryId);
        return category?.dishes || [];
      },
      
      getDishById: (dishId: string) => {
        for (const category of get().categories) {
          const dish = category.dishes.find(d => d.id === dishId);
          if (dish) return dish;
        }
        return undefined;
      },
      
      getCategoryById: (categoryId: string) => {
        return get().categories.find(c => c.id === categoryId);
      },
      
      resetToDefault: () => {
        set({ categories: initialMenuData });
      }
    }),
    {
      name: 'menu-storage'
    }
  )
);


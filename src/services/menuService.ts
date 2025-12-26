import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Category, Dish } from '../types';
import { menuData as initialMenuData } from '../data/menu';

// 数据库表的类型定义
interface DbCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

interface DbDish {
  id: string;
  name: string;
  description: string;
  image: string;
  category_id: string;
  tags: string[] | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

// 将数据库格式转换为应用格式
const dbCategoryToCategory = (dbCategory: DbCategory, dishes: Dish[]): Category => ({
  id: dbCategory.id,
  name: dbCategory.name,
  icon: dbCategory.icon,
  dishes: dishes.filter(d => d.category === dbCategory.id)
});

const dbDishToDish = (dbDish: DbDish): Dish => ({
  id: dbDish.id,
  name: dbDish.name,
  description: dbDish.description,
  image: dbDish.image,
  category: dbDish.category_id,
  tags: dbDish.tags || undefined
});

// 将应用格式转换为数据库格式
const dishToDbDish = (dish: Dish, sortOrder: number = 0): Omit<DbDish, 'created_at' | 'updated_at'> => ({
  id: dish.id,
  name: dish.name,
  description: dish.description,
  image: dish.image,
  category_id: dish.category,
  tags: dish.tags || null,
  sort_order: sortOrder
});

const categoryToDbCategory = (category: Category, sortOrder: number = 0): Omit<DbCategory, 'created_at' | 'updated_at'> => ({
  id: category.id,
  name: category.name,
  icon: category.icon,
  sort_order: sortOrder
});

// 菜单服务
export const menuService = {
  // 获取所有分类和菜品
  async fetchAll(): Promise<Category[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase 未配置，使用本地数据');
      return initialMenuData;
    }

    try {
      // 获取所有分类
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (categoriesError) throw categoriesError;

      // 获取所有菜品
      const { data: dishesData, error: dishesError } = await supabase
        .from('dishes')
        .select('*')
        .order('sort_order', { ascending: true });

      if (dishesError) throw dishesError;

      // 如果数据库为空，初始化数据
      if (!categoriesData || categoriesData.length === 0) {
        console.log('数据库为空，初始化默认数据...');
        await this.initializeData();
        return initialMenuData;
      }

      // 转换为应用格式
      const dishes = (dishesData || []).map(dbDishToDish);
      const categories = (categoriesData || []).map(cat => 
        dbCategoryToCategory(cat, dishes)
      );

      return categories;
    } catch (error) {
      console.error('获取菜单数据失败:', error);
      return initialMenuData;
    }
  },

  // 初始化数据库数据
  async initializeData(): Promise<void> {
    if (!isSupabaseConfigured()) return;

    try {
      // 插入分类
      const dbCategories = initialMenuData.map((cat, index) => 
        categoryToDbCategory(cat, index)
      );
      
      const { error: catError } = await supabase
        .from('categories')
        .upsert(dbCategories, { onConflict: 'id' });

      if (catError) throw catError;

      // 插入菜品
      const dbDishes: Omit<DbDish, 'created_at' | 'updated_at'>[] = [];
      initialMenuData.forEach((cat) => {
        cat.dishes.forEach((dish, dishIndex) => {
          dbDishes.push(dishToDbDish(dish, dishIndex));
        });
      });

      const { error: dishError } = await supabase
        .from('dishes')
        .upsert(dbDishes, { onConflict: 'id' });

      if (dishError) throw dishError;

      console.log('数据初始化成功');
    } catch (error) {
      console.error('数据初始化失败:', error);
    }
  },

  // 添加菜品
  async addDish(dish: Dish): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      // 获取当前分类的菜品数量作为排序
      const { count } = await supabase
        .from('dishes')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', dish.category);

      const { error } = await supabase
        .from('dishes')
        .insert(dishToDbDish(dish, count || 0));

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('添加菜品失败:', error);
      return false;
    }
  },

  // 更新菜品
  async updateDish(dishId: string, dish: Partial<Dish>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      const updateData: Record<string, unknown> = {};
      if (dish.name !== undefined) updateData.name = dish.name;
      if (dish.description !== undefined) updateData.description = dish.description;
      if (dish.image !== undefined) updateData.image = dish.image;
      if (dish.category !== undefined) updateData.category_id = dish.category;
      if (dish.tags !== undefined) updateData.tags = dish.tags || null;

      const { error } = await supabase
        .from('dishes')
        .update(updateData)
        .eq('id', dishId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('更新菜品失败:', error);
      return false;
    }
  },

  // 删除菜品
  async deleteDish(dishId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      const { error } = await supabase
        .from('dishes')
        .delete()
        .eq('id', dishId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('删除菜品失败:', error);
      return false;
    }
  },

  // 添加分类
  async addCategory(category: Category): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      // 获取当前分类数量作为排序
      const { count } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      const { error } = await supabase
        .from('categories')
        .insert(categoryToDbCategory(category, count || 0));

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('添加分类失败:', error);
      return false;
    }
  },

  // 更新分类
  async updateCategory(categoryId: string, category: Partial<Category>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      const updateData: Record<string, unknown> = {};
      if (category.name !== undefined) updateData.name = category.name;
      if (category.icon !== undefined) updateData.icon = category.icon;

      const { error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', categoryId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('更新分类失败:', error);
      return false;
    }
  },

  // 删除分类
  async deleteCategory(categoryId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      // 先删除该分类下的所有菜品
      await supabase
        .from('dishes')
        .delete()
        .eq('category_id', categoryId);

      // 再删除分类
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('删除分类失败:', error);
      return false;
    }
  }
};


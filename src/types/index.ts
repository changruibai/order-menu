// 菜品接口
export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
}

// 分类接口
export interface Category {
  id: string;
  name: string;
  icon: string;
  dishes: Dish[];
}

// 购物车项接口
export interface CartItem {
  dish: Dish;
  quantity: number;
}

// 订单接口
export interface Order {
  id: string;
  items: CartItem[];
  note: string;
  createdAt: Date;
  userName: string;
}


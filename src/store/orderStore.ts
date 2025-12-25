import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, CartItem } from '../types';

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[], note: string, userName: string) => Order;
  getOrders: () => Order[];
}

// 生成唯一订单ID
const generateOrderId = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${dateStr}${timeStr}-${random}`;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (items: CartItem[], note: string, userName: string) => {
        const newOrder: Order = {
          id: generateOrderId(),
          items,
          note,
          userName,
          createdAt: new Date()
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
        
        return newOrder;
      },
      
      getOrders: () => get().orders
    }),
    {
      name: 'order-storage'
    }
  )
);



import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Dish, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (dish: Dish) => {
        set((state) => {
          const existingItem = state.items.find(item => item.dish.id === dish.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.dish.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return { items: [...state.items, { dish, quantity: 1 }] };
        });
      },
      
      removeItem: (dishId: string) => {
        set((state) => {
          const existingItem = state.items.find(item => item.dish.id === dishId);
          if (existingItem && existingItem.quantity > 1) {
            return {
              items: state.items.map(item =>
                item.dish.id === dishId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            };
          }
          return { items: state.items.filter(item => item.dish.id !== dishId) };
        });
      },
      
      updateQuantity: (dishId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter(item => item.dish.id !== dishId) };
          }
          return {
            items: state.items.map(item =>
              item.dish.id === dishId ? { ...item, quantity } : item
            )
          };
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);


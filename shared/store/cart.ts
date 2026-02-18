import { getCartDetails } from '@/shared/lib';
import { Api } from '../services/api-client';
import { create } from 'zustand';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // Получение товаров из корзины
  fetchCartItems: () => Promise<void>;

  //  Обновление количества товара
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Добавление товара в корзину !!!!todo
  addCartItem: (values: CreateCartItemValues) => Promise<void>;

  // Удаление товара из корзины
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      const details = getCartDetails(data);
      set({
        ...details,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      const details = getCartDetails(data);
      set({
        ...details,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      const details = getCartDetails(data);
      set({
        ...details,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item,
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      const details = getCartDetails(data);
      set({
        ...details,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
}));

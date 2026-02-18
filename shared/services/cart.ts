import { CartDto, CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { axiosInstance } from '@/shared/services/instance';

export const getCart = async (): Promise<CartDto> => {
  const { data } = await axiosInstance.get<CartDto>('/cart');
  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDto> => {
  const { data } = await axiosInstance.patch<CartDto>('/cart/' + itemId, {
    quantity,
  });

  return data;
};

export const removeCartItem = async (itemId: number): Promise<CartDto> => {
  const { data } = await axiosInstance.delete<CartDto>('/cart/' + itemId);
  return data;
};

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDto> => {
  const { data } = await axiosInstance.post<CartDto>('/cart/', values);
  return data;
};

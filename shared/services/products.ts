import { ApiRoutes } from '@/shared/services/constants';
import { axiosInstance } from '@/shared/services/instance';
import { Product } from '@prisma/client';

export const search = async (query: string): Promise<Product[]> => {
  return (
    await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};

//берет данные из ApiRoutes.SEARCH_PRODUCTS

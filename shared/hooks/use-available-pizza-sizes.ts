import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '@/shared/constants/pizza';
import { useMemo } from 'react';
import { Variant } from '@/shared/group-variants';

// хук для списка доступных размеров пиццы
export const useAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[],
): Variant[] => {
  const availablePizzaSizes = useMemo(() => {
    return pizzaSizes.map((item) => ({
      name: item.name,
      value: item.value,
      disabled: !items.some(
        (pizza) =>
          pizza.pizzaType === type && Number(pizza.size) === Number(item.value),
      ),
    }));
  }, [items, type]);

  return availablePizzaSizes;
};

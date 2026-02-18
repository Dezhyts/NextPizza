
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Variant } from '@/shared/group-variants';
import { useAvailablePizzaSizes } from '@/shared/hooks/use-available-pizza-sizes';
import { ProductItem } from '@prisma/client';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  selectedSize: PizzaSize;
  type: PizzaType;
  setSelectedSize: (selectedSize: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  availablePizzaSizes: Variant[];
  currentItemId?: number;
}

export const usePizzaOptions = (
  items: ProductItem[], // результат первого хука
): ReturnProps => {
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(20); //храним выбор user
  const [type, setType] = useState<PizzaType>(1);

  const availablePizzaSizes = useAvailablePizzaSizes(type, items);

  const size = useMemo(() => {
    const isAvailable = availablePizzaSizes.some(
      (item) => !item.disabled && Number(item.value) === selectedSize,
    );

    if (isAvailable) return selectedSize;

    const firstAvailable = availablePizzaSizes.find((item) => !item.disabled);
    return Number(firstAvailable?.value) as PizzaSize;
  }, [availablePizzaSizes, selectedSize]);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size,
  )?.id;

  return {
    type,
    selectedSize: size,
    setType,
    setSelectedSize,
    selectedIngredients,
    addIngredient,
    availablePizzaSizes,
    currentItemId,
  };
};

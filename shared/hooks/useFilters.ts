import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
export interface FilterState {
  selectedIngredients: Set<string>;
  pizzaTypes: Set<string>;
  sizes: Set<string>;
  prices: PriceProps;
}

export interface FilterActions {
  // методы для изменения
  toggleIngredient: (value: string) => void;
  togglePizzaType: (value: string) => void;
  toggleSize: (value: string) => void;
  setPrices: (name: keyof PriceProps, value: number) => void;
  removeIngredients: (key: string) => void;
  removePizzaTypes: (key: string) => void;
  removeToggleSize: (key: string) => void;
  clearAllFilters: () => void;
}

export const useFilters = (): [FilterState, FilterActions] => {
  const searchParams = useSearchParams();

  const ingredientsFromQuery = searchParams.get('ingredients');
  const sizesFromQuery = searchParams.get('sizes');
  const pizzaTypesFromQuery = searchParams.get('pizzaTypes');
  const priceFromQuery = searchParams.get('priceFrom');
  const priceToQuery = searchParams.get('priceTo');

  // выбранные фильтры

  const [
    selectedIngredients,
    { toggle: toggleIngredient, reset: removeIngredients },
  ] = useSet(
    new Set(ingredientsFromQuery ? ingredientsFromQuery.split(',') : []),
  );
  const [pizzaTypes, { toggle: togglePizzaType, reset: removePizzaTypes }] =
    useSet(new Set(pizzaTypesFromQuery ? pizzaTypesFromQuery.split(',') : []));
  const [sizes, { toggle: toggleSize, reset: removeToggleSize }] = useSet(
    new Set(sizesFromQuery ? sizesFromQuery.split(',') : []),
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: priceFromQuery ? Number(priceFromQuery) : undefined,
    priceTo: priceToQuery ? Number(priceToQuery) : undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const clearAllFilters = () => {
    removeIngredients(); // очищает selectedIngredients
    removePizzaTypes(); // очищает pizzaTypes
    removeToggleSize(); // очищает sizes

    setPrices({ priceFrom: 0, priceTo: 1000 }); // обновляем цены
  };

  return [
    {
      selectedIngredients,
      pizzaTypes,
      sizes,
      prices,
    },
    {
      toggleIngredient,
      removeIngredients,
      removePizzaTypes,
      removeToggleSize,
      togglePizzaType,
      toggleSize,
      setPrices: updatePrice,
      clearAllFilters,
    },
  ] as const;
};

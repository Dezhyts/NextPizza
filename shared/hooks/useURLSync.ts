import { FilterState } from '@/shared/hooks/useFilters';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useRef } from 'react';

export const useURLSync = (props: FilterState) => {
  const router = useRouter();
  const { selectedIngredients, pizzaTypes, sizes, prices } = props;
  const isMounted = useRef(false);
  // синхронизация с URL
  useEffect(() => {
    if (isMounted.current) {
      const filters = {
        ...prices,
        ingredients: Array.from(selectedIngredients),
        pizzaTypes: Array.from(pizzaTypes),
        sizes: Array.from(sizes),
      };
      const query = qs.stringify(filters, { arrayFormat: 'comma' });

      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [pizzaTypes, prices, router, selectedIngredients, sizes]);
};

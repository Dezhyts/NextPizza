
import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnFilters {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useFilterIngredients = (): ReturnFilters => {
  // список всех ингредиентов
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  // загрузка ингредиентов
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const allIngredients = await Api.ingredients.getAll();
        setIngredients(allIngredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};

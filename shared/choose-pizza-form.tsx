'use client';
import { getPizzaDetails } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';
import { IngredientItem } from '@/shared';
import { Button } from '@/shared/components/ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { usePizzaOptions } from '@/shared/hooks';
import { PizzaImage } from '@/shared/pizza-image';
import { Title } from '@/shared/title';
import { Ingredient, ProductItem } from '@prisma/client';
import { GroupVariants } from './group-variants';

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  className?: string;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
}
// Форма выбора пиццы
export const ChoosePizzaForm = ({
  className,
  name,
  imageUrl,
  ingredients,
  items,
  onSubmit,
  loading,
}: ChoosePizzaFormProps) => {
  const {
    selectedSize: size,
    setSelectedSize,
    type,
    setType,
    selectedIngredients,
    addIngredient,
    availablePizzaSizes,
    currentItemId,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[530px] bg-[#f7f6f5] p-3">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-3 mt-4">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSelectedSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[390px] scrollbar mt-3">
          <div className="grid grid-cols-3 gap-2 auto-rows-[190px]">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

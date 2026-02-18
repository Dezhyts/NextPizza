'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface ProductFormProps {
  onSubmit?: VoidFunction;
  product: ProductWithRelations;
}

export const ProductForm = (props: ProductFormProps) => {
  const { product, onSubmit: _onSubmit } = props;
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлена в корзину');
      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        name={product.name}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};

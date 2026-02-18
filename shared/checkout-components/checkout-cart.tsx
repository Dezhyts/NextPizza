import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '@/shared';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemsDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface CheckoutCartProps {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
}

export const CheckoutCart = ({
  className,
  onClickCountButton,
  removeCartItem,
  items,
  loading,
}: CheckoutCartProps) => {

  const showSkeleton = loading && items.length === 0;

  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {showSkeleton
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} className="h-12" />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemsDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                name={item.name}
                disabled={item.disabled}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};

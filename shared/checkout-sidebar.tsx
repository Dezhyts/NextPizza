import { CheckoutItemDetails, WhiteBlock } from '@/shared';
import { Button, Skeleton } from '@/shared/components/ui';
import { ArrowRight, Package, Truck } from 'lucide-react';

interface CheckoutSidebarProps {
  className?: string;
  totalAmount: number;
  loading?: boolean;
}

export const CheckoutSidebar = ({
  totalAmount,
  loading,
}: CheckoutSidebarProps) => {
  const VAT = 15;
  const DELIVERY_PRICE = totalAmount > 0 ? 250 : 0;

  const vatPrice =
    totalAmount > 0 ? Number(((totalAmount * VAT) / 100).toFixed(2)) : 0;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap1">
        <span className="text-xl">Итого </span>
        {loading ? (
          <Skeleton className=" h-11 w-56" />
        ) : (
          <span className=" h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-12 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-12 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-12 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14  rounded-2xl mt-6 text-base font-bold"
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

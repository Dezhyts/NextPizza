'use client';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from '@/shared';
import { Button } from '@/shared/components/ui';
import { useCartStore } from '@/shared/store';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface CardButtonProps {
  className?: string;
}

export const CartButton = ({ className }: CardButtonProps) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartDrawer>
      <Button loading={loading} className={cn('group-relative', className)}>
        <b>{totalAmount}₽ </b>
        <span className="h-full w-[1px] bg-white/30 mx-4" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>{totalItems}</b>
        </div>
        <ArrowRight
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          size={20}
        />
      </Button>
    </CartDrawer>
  );
};

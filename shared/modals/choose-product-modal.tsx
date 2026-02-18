'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '@/shared';
import { Dialog } from '@/shared/components/ui';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
  onOpenChange?(open: boolean): void;
  onSubmit?: () => void;
}

export const ChooseProductModal = ({
  product,
  className,
}: ChooseProductModalProps) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1080px] max-w-[1080px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <DialogTitle className="absolute w-0 h-0 overflow-hidden p-0 m-0 border-0">
          <VisuallyHidden>Выбор продукта</VisuallyHidden>
          <DialogDescription className="sr-only">
            Здесь пользователь выбирает продукт или пиццу с ингредиентами
          </DialogDescription>
        </DialogTitle>

        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

'use client';
import { cn } from '@/shared/lib/utils';
import { ProductCard, Title } from '@/shared';
import { useCategoryStore } from '@/shared/store/category';
import { RefObject, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { ProductWithRelations } from '@/@types/prisma';

interface ProductsGroupListProps {
  className?: string;
  items: ProductWithRelations[];
  title: string;
  listClassName?: string;
  categoryId: number;
}
export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  className,
  title,
  listClassName,
  categoryId,
  items,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLDivElement>,
    {
      threshold: 0.9,
    },
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div
      className={cn('min-h-[400px]', className)}
      id={title}
      ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            id={product.id}
            name={product.name}
            key={product.id}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

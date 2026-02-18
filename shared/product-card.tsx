import { Button } from '@/shared/components/ui';
import { Title } from '@/shared';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';

interface ProductCardProps {
  className?: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
}
export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  ingredients,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>
        <div className="flex justify-between mt-4 items-center">
          <span className="text-[20px]">
            от <b>{price}₽</b>
          </span>
          <Button variant={'secondary'}>
            <Plus className="mr-1" size={20} />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

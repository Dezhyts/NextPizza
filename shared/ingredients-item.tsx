import { CircleCheck } from 'lucide-react';
import { cn } from './lib/utils';

interface IngredientProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

export const IngredientItem: React.FC<IngredientProps> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-[7.35rem] text-center relative cursor-pointer shadow-md bg-white ',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}>
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <div className="w-[100px] h-[100px] flex-shrink-0 ">
        <img src={imageUrl} />
      </div>

      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold mt-auto ">{price} ₽</span>
    </div>
  );
};

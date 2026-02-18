import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/title';

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  className?: string;
  onSubmit?: VoidFunction;
  price: number;
  loading: boolean;
}
// Форма выбора продукта
export const ChooseProductForm = ({
  className,
  name,
  imageUrl,
  onSubmit,
  price,
  loading,
}: ChoosePizzaFormProps) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 translate-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#f7f7f5] p-7  ">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};

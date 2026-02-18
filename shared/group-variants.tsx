'use client';
import { cn } from '@/shared/lib/utils';

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface GroupVariantsProps {
  items: readonly Variant[];
  value?: Variant['value'];
  onClick?: (value: Variant['value']) => void;
  className?: string;
}

export const GroupVariants: React.FC<GroupVariantsProps> = ({
  items,
  value,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
      )}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex justify-center items-center cursor-pointer h-[35px] px-5 flex-1 rounded-3xl transition-all duration-500 text-sm',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

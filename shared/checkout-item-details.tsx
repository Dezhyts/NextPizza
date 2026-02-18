import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

interface CheckoutItemDetailsProps {
  title?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export const CheckoutItemDetails = ({
  className,
  title,
  value,
}: CheckoutItemDetailsProps) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className=" flex flex-1 text-lg text-neutral-500">
        {title}
        <div className=" flex-1 border-b border-dashed border-b-neutral-600 relative -top-1 mx-1" />
      </span>

      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};

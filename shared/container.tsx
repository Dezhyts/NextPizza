import { cn } from '@/shared/lib/utils';

interface containerProps {
  className?: string;
}
export const Container: React.FC<React.PropsWithChildren<containerProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('max-w-[1500px] mx-auto ', className)}>{children}</div>
  );
};

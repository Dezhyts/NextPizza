import { cn } from '@/shared/lib/utils';

interface ErrorTextProps {
  className?: string;
  text?: string;
}

export const ErrorText = ({ className, text }: ErrorTextProps) => {
  return <p className={cn('text-red-500 text-sm ', className)}>{text}</p>;
};

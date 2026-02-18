'use client';
import { ClearButton, ErrorText } from '@/shared';
import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface FormInputMaskHookProps {
  name: string;
  label?: string;
  className?: string;
  mask?: string; // маска (если не нужна — можно оставить undefined)
  required?: boolean;
  placeholder?: string;
}

export const FormInputMask = ({
  name,
  className,
  mask,
  placeholder,
  ...props
}: FormInputMaskHookProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;
  const value = watch(name);

  const onClickClear = () => {
    setValue(name, '');
  };
  const sizeStyles = 'h-12 text-md w-full'; // отдельный кусок

  return (
    <div className={className}>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            mask ? (
              <IMaskInput
                {...field}
                mask={mask}
                {...props}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                  setValue(name, e.currentTarget.value)
                }
                placeholder={placeholder}
                className={cn(
                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ',
                  sizeStyles,
                  className,
                )}
              />
            ) : (
              <Input
                {...field}
                placeholder={placeholder}
                className="h-12 text-md w-full"
                {...props}
              />
            )
          }
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

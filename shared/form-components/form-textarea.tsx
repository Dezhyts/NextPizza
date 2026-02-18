'use client';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared';
import { Textarea } from '@/shared/components/ui';
import { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea = ({
  className,
  name,
  label,
  required,
  ...props
}: FormTextareaProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const errorText = errors[name]?.message as string;
  const value = watch(name);

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className=" font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

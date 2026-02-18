'use client';
import { Input } from '@/shared/components/ui';
import {
  ClearButton,
  ErrorText,
  RequiredSymbol,
} from '@/shared/form-components';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}

export const FormInput = ({
  className,
  name,
  label,
  required,
  ...props
}: FormInputProps) => {
  const {
    register, // register — подключает input к форме
    formState: { errors }, // errors — ошибки валидации полей
    watch, // watch — следит за значениями полей
    setValue, // setValue — вручную меняет значение поля
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: false });
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
        <Input className="h-12 text-md" {...props} {...register(name)} />
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

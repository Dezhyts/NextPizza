'use client';
import { AddressInput } from '@/shared';
import { ErrorText, FormTextarea } from '@/shared/form-components';
import { WhiteBlock } from '@/shared/white-block';
import { Controller, useFormContext } from 'react-hook-form';

interface CheckoutAddressFormProps {
  className?: string;
}

export const CheckoutAddressForm = ({
  className,
}: CheckoutAddressFormProps) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error && (
                <ErrorText text={fieldState.error.message} className="-mt-2" />
              )}
            </>
          )}
        />

        <FormTextarea
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
          name="comment"
        />
      </div>
    </WhiteBlock>
  );
};

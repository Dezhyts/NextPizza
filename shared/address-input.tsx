'use client';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface AddressInputProps {
  onChange?: (value?: string) => void;
}

export const AddressInput = ({ onChange }: AddressInputProps) => {
  return (
    <AddressSuggestions
      token="dbce3e5a22ae91bea2e9f48ab13d8fa87ac2c849"
      inputProps={{
        className:
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        placeholder: 'Введите адрес',
      }}
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

import { FormInput, FormInputMask, WhiteBlock } from '@/shared';

interface CheckoutPersonalFormProps {
  className?: string;
}

export const CheckoutPersonalForm = ({
  className,
}: CheckoutPersonalFormProps) => {


  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInputMask
          name="phone"
          className="text-base"
          placeholder="Телефон"
          mask="+{7} (000) 000-00-00"
        />
      </div>
    </WhiteBlock>
  );
};

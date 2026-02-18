'use client';
import { registerUser } from '@/app/actions/actions';
import { Button } from '@/shared/components/ui';
import { FormInput } from '@/shared/form-components';
import {
  formRegisterSchema,
  FormRegisterValues,
} from '@/shared/modals/forms/schemas';
import { Title } from '@/shared/title';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RegisterFormProps {
  onClose?: () => void;
  onClickRegister?: () => void;
}

export const RegisterForm = ({
  onClose,
  onClickRegister,
}: RegisterFormProps) => {
  const form = useForm<FormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      onClose?.();

      toast.success('Регистрация успешна 📝. Подтвердите свою почту ', {
        icon: '✅',
      });
    } catch (error) {
      console.error('Error [REGISTER]', error);
      toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>
        <FormInput name={'email'} label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput type="password" name="password" label="Пароль" required />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Подтвердите пароль"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

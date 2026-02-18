import { Button } from '@/shared/components/ui';
import { FormInput } from '@/shared/form-components';
import { FormLoginValues } from '@/shared/modals/forms';
import { formLoginSchema } from '@/shared/modals/forms/schemas';
import { Title } from '@/shared/title';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface LoginFormProps {
  className?: string;
  onClose?: VoidFunction;
}

export const LoginForm = ({ className, onClose }: LoginFormProps) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) {
        throw Error();
      }
      onClose?.();

      toast.success('Вы успешно вошли в аккаунт ', {
        icon: '✅',
      });
    } catch (error) {
      console.error('Error [LOGIN]', error);
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
        <FormInput
          type="password"
          name={'password'}
          label="Password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};

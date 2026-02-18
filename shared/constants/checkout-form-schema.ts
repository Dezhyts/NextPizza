import z from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2-х символов' }),

  lastName: z
    .string()
    .min(2, { message: 'Фамилия должно содержать не менее 2-х символов' }),

  email: z.email().min(2, { message: 'Введите корректную почту' }),

  address: z.string().min(2, { message: 'Введите корректный номер телефона' }),

  phone: z.string().refine(
    (val) => {
      const digits = val.replace(/\D/g, ''); // оставляем только цифры
      return digits.length === 11; // +7 + 10 цифр номера
    },
    { message: 'Телефон должен содержать минимум 11 цифр' },
  ),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

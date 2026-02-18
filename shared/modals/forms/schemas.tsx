import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(5, { message: 'Пароль должен содержать не менее 6 символов' });

export const formLoginSchema = z.object({
  email: z.email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .extend({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;

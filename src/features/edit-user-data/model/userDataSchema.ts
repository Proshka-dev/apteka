import { z } from 'zod';

export const userDataSchema = z.object({
	name: z.string().min(2, 'Имя слишком короткое'),
	phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат'),
	email: z
		.union([
			z.email({ message: 'Некорректный email' }),
			z.literal(''),
			z.undefined()
		]),
	birthDate: z.string().optional(),
	gender: z.enum(['male', 'female']).optional(),
});

export type UserDataFormValues = z.infer<typeof userDataSchema>;
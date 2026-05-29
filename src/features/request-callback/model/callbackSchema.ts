import { z } from 'zod';

export const callbackSchema = z.object({
	name: z.string().min(2, 'Имя слишком короткое'),
	phone: z.string().regex(/^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Введите телефон в формате +7 999 999 99 99'),
});

export type CallbackFormData = z.infer<typeof callbackSchema>;
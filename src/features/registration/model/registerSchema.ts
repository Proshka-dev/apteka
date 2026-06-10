import { z } from 'zod';

export const registerSchema = z.object({
	phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
	otp: z.string().regex(/^\d{6}$/, 'Неверный код'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
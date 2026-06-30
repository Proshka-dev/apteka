import { z } from 'zod';
import { emailSchema } from '@/shared/lib';

export const emailChangeSchema = z.object({
	email: emailSchema.optional(),   // разрешает валидный email, пустую строку или undefined
});

export type EmailChangeValues = z.infer<typeof emailChangeSchema>;
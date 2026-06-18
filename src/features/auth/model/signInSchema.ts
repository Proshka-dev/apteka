import { nameSchema, phoneSchema } from '@/shared/lib';
import { z } from 'zod';

export const signInSchema = z.object({
	name: nameSchema,
	phone: phoneSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;
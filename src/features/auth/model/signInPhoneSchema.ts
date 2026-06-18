import { phoneSchema } from '@/shared/lib';
import { z } from 'zod';

export const signInPhoneSchema = z.object({
	phone: phoneSchema,
});

export type SignInPhoneFormData = z.infer<typeof signInPhoneSchema>;
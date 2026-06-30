import { z } from 'zod';
import { phoneSchema } from '@/shared/lib';

export const phoneChangeSchema = z.object({
	phone: phoneSchema, //.optional(),   
});

export type PhoneChangeValues = z.infer<typeof phoneChangeSchema>;
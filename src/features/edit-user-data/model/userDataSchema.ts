import { nameSchema } from '@/shared/lib';
import { z } from 'zod';

export const userDataSchema = z.object({
	name: nameSchema,
	birthDate: z
		.string()
		.optional(),
	gender: z
		.enum(['male', 'female'])
		.optional()
		.or(z.literal('')),
});

export type UserDataValues = z.infer<typeof userDataSchema>;
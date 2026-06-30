import { z } from 'zod';

// Переиспользуемая схема Zod для поля email
export const emailSchema = z
	.union([
		z.email({ message: 'Некорректный email' }),
		z.literal(''),
	])

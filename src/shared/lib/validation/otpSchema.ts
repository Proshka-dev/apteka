import { z } from 'zod';

export const otpSchema = z
	.string()
	.length(6, 'Код должен состоять из 6 цифр')
	.regex(/^\d+$/, 'Только цифры');
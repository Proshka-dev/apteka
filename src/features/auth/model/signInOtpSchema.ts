import { otpSchema } from '@/shared/lib';
import { z } from 'zod';

export const signInOtpSchema = z.object({
	code: otpSchema,
});

export type SignInOtpFormData = z.infer<typeof signInOtpSchema>;
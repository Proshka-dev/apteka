import { z } from 'zod';

export const feedbackSchema = z.object({
	topic: z.string().min(1, 'Выберите тему'),
	message: z.string().min(10, 'Сообщение должно быть не менее 10 символов'),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
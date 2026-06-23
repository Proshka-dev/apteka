'use server';
import { prisma } from '@/shared/lib/prisma';
import { requireAuth } from '@/shared/lib/auth/dal';
import { FeedbackFormValues, feedbackSchema } from '../model/feedbackSchema';

export async function submitFeedback(data: FeedbackFormValues) {
	const session = await requireAuth();
	const parsed = feedbackSchema.safeParse(data);
	if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

	await prisma.feedback.create({
		data: {
			topic: parsed.data.topic,
			message: parsed.data.message,
			userId: session.user.id,
		},
	});

	return { success: true };
}
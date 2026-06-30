// features/edit-personal-data/api/updateEmailBeforeVerification.ts
'use server';

import { requireAuth } from '@/shared/lib/auth/dal';
import { prisma } from '@/shared/lib/prisma';

export async function updateEmailBeforeVerification(email: string) {
	const session = await requireAuth();
	await prisma.user.update({
		where: { id: session.user.id },
		data: {
			email,
			emailVerified: false,
		},
	});
}
// entities/user/api/getUsersForAdmin.ts
'use server';

import { requireAdmin } from '@/shared/lib/auth/dal';
import { prisma } from '@/shared/lib/prisma';

export async function getUsersForAdmin() {
	await requireAdmin(); // гарантирует, что вызов делает админ

	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			phoneNumber: true,
			role: true,
			emailVerified: true,
			phoneNumberVerified: true,
			createdAt: true,
		},
		orderBy: { createdAt: 'desc' },
	});

	return users;
}

export type GetUsersForAdminResponse = NonNullable<Awaited<ReturnType<typeof getUsersForAdmin>>>;
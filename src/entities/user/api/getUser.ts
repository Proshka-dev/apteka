'use server';
import { prisma } from '@/shared/lib/prisma';

export async function getUserById(userId: string) {
	return prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			phoneNumber: true,
			birthDate: true,
			gender: true
		},
	});
}
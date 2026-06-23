'use server';
import { prisma } from '@/shared/lib/prisma';

export async function getOrdersByUser(userId: string) {
	return prisma.order.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
		include: { items: true }, // если есть связь с товарами
	});
}
'use server';

import { prisma } from '@/shared/lib/prisma';

export async function getProductBySlug(slug: string) {
	return prisma.product.findUnique({
		where: { slug },
	});
}

export type ProductResponse = Awaited<ReturnType<typeof getProductBySlug>>;
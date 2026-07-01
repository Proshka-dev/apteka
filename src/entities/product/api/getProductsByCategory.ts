'use server';

import { prisma } from '@/shared/lib/prisma';
import type { Prisma } from '@prisma/client';

export type ProductFilters = {
	priceMin?: number;
	priceMax?: number;
	countries?: string[];
	effects?: string[];
	inStock?: boolean;
};

export async function getProductsByCategory(
	categorySlug: string,
	filters: ProductFilters,
	page: number = 1,
	pageSize: number = 12
) {
	const where: Prisma.ProductWhereInput = {
		category: { slug: categorySlug },
	};

	// Фильтр по цене
	if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
		where.price = {};
		if (filters.priceMin !== undefined) where.price.gte = filters.priceMin;
		if (filters.priceMax !== undefined) where.price.lte = filters.priceMax;
	}

	// Фильтр по странам
	if (filters.countries && filters.countries.length > 0) {
		where.country = { in: filters.countries };
	}

	// Фильтр по воздействиям
	if (filters.effects && filters.effects.length > 0) {
		where.effects = { hasSome: filters.effects };
	}

	// Фильтр по наличию
	if (filters.inStock) {
		where.inStock = true;
	}

	const [products, totalCount] = await Promise.all([
		prisma.product.findMany({
			where,
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { createdAt: 'desc' },
		}),
		prisma.product.count({ where }),
	]);

	return {
		products,
		totalCount,
		totalPages: Math.ceil(totalCount / pageSize),
		currentPage: page,
	};
}

export type GetProductsByCategoryResponse = Awaited<ReturnType<typeof getProductsByCategory>>;
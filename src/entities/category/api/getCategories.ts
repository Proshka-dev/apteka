import 'server-only' // защита от случайного импорта на клиенте
import { prisma } from '@/shared/lib'
import { Category } from '../types'

export async function getCategories(): Promise<Category[]> {
	const categories = await prisma.category.findMany({
		orderBy: { name: 'asc' },
	})
	return categories.map(category => ({
		...category,
		parentId: category.parentId ?? null,
	}))
}
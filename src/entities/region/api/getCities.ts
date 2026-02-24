import 'server-only' // защита от случайного импорта на клиенте
import { prisma } from '@/shared/lib'
import { City } from '../types'

export async function getCities(): Promise<City[]> {
	const cities = await prisma.city.findMany({
		orderBy: { name: 'asc' },
	})
	return cities.map(city => ({
		id: city.id,
		name: city.name,
		slug: city.slug ?? undefined,
	}))
}
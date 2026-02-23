import { City, CitySchema } from '../types'

export async function fetchCities(): Promise<City[]> {
	const res = await fetch('/api/cities')
	if (!res.ok) {
		throw new Error('Failed to fetch cities')
	}
	const data = await res.json()
	// Опционально валидируем ответ с Zod
	return CitySchema.array().parse(data)
}
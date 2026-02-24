'use server'
import 'server-only' // защита от случайного импорта на клиенте
import { cookies } from 'next/headers'
import { City } from '../types'

export async function getDefaultSelectedCity(cities: City[]): Promise<City | null> {
	const cookieStore = await cookies()
	const selectedCityId = cookieStore.get('selectedCityId')?.value

	if (selectedCityId) {
		const city = cities.find(c => c.id === Number(selectedCityId))
		if (city) return city
	}

	// Если нет куки или город не найден, пробуем Москву по slug
	const moscow = cities.find(c => c.slug === 'moscow')
	if (moscow) return moscow

	// Иначе первый из списка
	return cities[0] ?? null
}
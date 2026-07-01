// prisma/seed-cities.ts
import type { PrismaClient } from '@prisma/client';
import { transliterate, slugify } from './seed-utils';

export async function seedCities(prisma: PrismaClient) {
	const cityNames = [
		'Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Ростов-на-Дону',
		'Самара', 'Казань', 'Екатеринбург', 'Тольятти', 'Омск', 'Волгоград',
		'Ставрополь', 'Краснодар', 'Воронеж', 'Уфа', 'Ярославль', 'Саратов',
		'Ижевск', 'Челябинск', 'Красноярск', 'Новосибирск', 'Ачинск',
		'Кемерово', 'Иркутск', 'Владивосток', 'Тюмень', 'Хабаровск',
		'Пермь', 'Барнаул', 'Липецк', 'Пенза'
	];

	const citiesData = cityNames.map(name => ({
		name,
		slug: slugify(name)
	}));

	await prisma.city.deleteMany({});
	console.log('🗑️ Старые города удалены');

	await prisma.city.createMany({ data: citiesData });
	console.log(`✅ Добавлено ${citiesData.length} городов`);
}
// prisma/seed-products.ts
import type { PrismaClient } from '@prisma/client';
import { transliterate, slugify } from './seed-utils';

export async function seedProducts(prisma: PrismaClient) {
	const categories = await prisma.category.findMany({ select: { id: true } });
	if (categories.length === 0) {
		console.warn('⚠️ Категории не найдены. Пропускаем товары.');
		return;
	}
	const catIds = categories.map(c => c.id);

	const brands = [
		'Фармстандарт', 'Биокад', 'Валента', 'Отисифарм', 'Верофарм',
		'Гедеон Рихтер', 'Тева', 'Санофи', 'Байер', 'Новартис',
		'АстраЗенека', 'Пфайзер', 'Рош', 'Сандоз', 'Эгис',
		'КРКА', 'Оболенское', 'Мосхимфармпрепараты', 'Татхимфармпрепараты', 'УфаВита'
	];

	const names = [
		'Анальгин', 'Аспирин', 'Парацетамол', 'Ибупрофен', 'Нурофен',
		'Терафлю', 'Колдрекс', 'Антигриппин', 'Ринза', 'Фервекс',
		'Лазолван', 'Амбробене', 'АЦЦ', 'Бромгексин', 'Мукалтин',
		'Називин', 'Тизин', 'Снуп', 'Аквамарис', 'Долфин',
		'Супрастин', 'Тавегил', 'Зодак', 'Кларитин', 'Эриус',
		'Омепразол', 'Ранитидин', 'Фосфалюгель', 'Маалокс', 'Гевискон',
		'Но-шпа', 'Дротаверин', 'Папаверин', 'Спазмалгон', 'Баралгин',
		'Валидол', 'Корвалол', 'Валосердин', 'Нитроглицерин', 'Кардиомагнил',
		'Эналаприл', 'Капотен', 'Лизиноприл', 'Лозартан', 'Амлодипин',
		'Аторвастатин', 'Розувастатин', 'Симвастатин', 'Фенофибрат', 'Омакор',
		'Метформин', 'Глибенкламид', 'Гликлазид', 'Инсулин', 'Глюкофаж',
		'Левотироксин', 'Эутирокс', 'Тирозол', 'Мерказолил', 'Йодомарин',
		'Амоксициллин', 'Амоксиклав', 'Флемоксин', 'Супракс', 'Цефтриаксон',
		'Азитромицин', 'Кларитромицин', 'Эритромицин', 'Линкомицин', 'Доксициклин',
		'Фурадонин', 'Нитроксолин', 'Палин', 'Монурал', 'Канефрон',
		'Уролесан', 'Цистон', 'Фитолизин', 'Кетонал', 'Диклофенак',
		'Вольтарен', 'Найз', 'Ксефокам', 'Мелоксикам', 'Целебрекс',
		'Мидокалм', 'Сирдалуд', 'Баклофен', 'Тизанидин', 'Катадолон',
		'Феназепам', 'Афобазол', 'Грандаксин', 'Атаракс', 'Стрезам',
		'Фенибут', 'Пантогам', 'Пирацетам', 'Ноотропил', 'Мексидол'
	];

	const packageSizes = [10, 20, 30, 50, 60, 100];

	const countries = ['Беларусь', 'Германия', 'Греция', 'Ирландия', 'Испания', 'Италия', 'Китай'];

	const allEffects = [
		'для бронхов', 'для желудка', 'для волос', 'для горла',
		'для губ', 'для дыхательных путей', 'для желудка'
	];

	console.log('🛒 Генерация 100 товаров...');
	for (let i = 0; i < 100; i++) {
		const country = countries[Math.floor(Math.random() * countries.length)];
		const effectCount = Math.floor(Math.random() * 3) + 1; // 1-3 эффекта
		const effects = Array.from({ length: effectCount }, () =>
			allEffects[Math.floor(Math.random() * allEffects.length)]
		);
		const name = names[i % names.length];
		const brand = brands[Math.floor(Math.random() * brands.length)];
		const code = `${300000 + i}`;
		const price = Math.floor(Math.random() * 1900) + 100;
		const oldPrice = Math.random() < 0.3 ? price + Math.floor(Math.random() * 400) : null;
		const inStock = Math.random() < 0.85;
		const isProductOfDay = Math.random() < 0.1;
		const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;
		const packageQty = packageSizes[Math.floor(Math.random() * packageSizes.length)];
		const slug = slugify(name) + '-' + code;
		const categoryId = catIds[Math.floor(Math.random() * catIds.length)];

		await prisma.product.upsert({
			where: { slug },
			update: {},
			create: {
				name,
				slug,
				code,
				brand,
				packageQuantity: packageQty,
				price,
				oldPrice,
				inStock,
				isProductOfDay,
				rating,
				country,
				effects,
				imagePath: null,
				categoryId,
			},
		});
	}
	console.log(`✅ 100 товаров добавлено`);
}
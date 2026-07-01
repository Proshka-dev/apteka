// prisma/seed-categories.ts
import type { PrismaClient } from '@prisma/client';
import { transliterate, slugify } from './seed-utils';

export async function seedCategories(prisma: PrismaClient) {
	const categoryItems = [
		{ name: 'лекарства', iconName: 'pills' },
		{ name: 'витамины и бад', iconName: 'vitamins' },
		{ name: 'красота', iconName: 'skinCare' },
		{ name: 'гигиена', iconName: 'washingHands' },
		{ name: 'линзы', iconName: 'eyeIcon' },
		{ name: 'мать и дитя', iconName: 'babyBoy' },
		{ name: 'медтовары', iconName: 'firstAidKit' },
		{ name: 'зоотовары', iconName: 'dogIcon' },
		{ name: 'медтехника', iconName: 'smartwatch' }
	];

	const categoriesData = categoryItems.map((item, index) => ({
		name: item.name,
		slug: slugify(item.name),
		iconName: item.iconName,
		order: index + 1,
		parentId: null,
	}));

	await prisma.category.deleteMany({});
	console.log('🗑️ Старые категории удалены');

	await prisma.category.createMany({ data: categoriesData });
	console.log(`✅ Добавлено ${categoriesData.length} категорий`);
}
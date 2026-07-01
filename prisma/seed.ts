// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { seedCities } from './seed-cities';
import { seedCategories } from './seed-categories';
import { seedProducts } from './seed-products';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Запуск seed...');

	// await seedCities(prisma);
	// await seedCategories(prisma);
	// await seedProducts(prisma);

	console.log('🎉 Seed завершён.');
}

main()
	.catch((e) => {
		console.error('❌ Ошибка seed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
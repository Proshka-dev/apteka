// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const cities = [
		{ name: 'Москва и область', slug: 'moscow' },
		{ name: 'Санкт-Петербург', slug: 'spb' },
		{ name: 'Казань', slug: 'kazan' },
		{ name: 'Красноярск', slug: 'krasnoyarsk' },
		{ name: 'Новосибирск', slug: 'novosibirsk' },
	]

	for (const city of cities) {
		await prisma.city.upsert({
			where: { name: city.name },
			update: {},
			create: city,
		})
	}

	console.log('Города добавлены')
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
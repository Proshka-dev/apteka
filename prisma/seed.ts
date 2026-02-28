// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Функция транслитерации кириллицы в латиницу
function transliterate(word: string): string {
	const map: Record<string, string> = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
		'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
		'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
		'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya',
		'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'e', 'Ё': 'e',
		'Ж': 'zh', 'З': 'z', 'И': 'i', 'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm',
		'Н': 'n', 'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't', 'У': 'u',
		'Ф': 'f', 'Х': 'kh', 'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh', 'Щ': 'shch',
		'Ы': 'y', 'Э': 'e', 'Ю': 'yu', 'Я': 'ya'
	}
	return word.split('').map(char => map[char] || char).join('')
}

function slugify(name: string): string {
	return transliterate(name)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // заменяем всё кроме букв и цифр на дефис
		.replace(/^-|-$/g, '')        // удаляем дефисы в начале и конце
}

async function main() {
	// Уникальный список из 30 крупных городов России
	const cityNames = [
		'Москва',
		'Санкт-Петербург',
		'Нижний Новгород',
		'Ростов-на-Дону',
		'Самара',
		'Казань',
		'Екатеринбург',
		'Тольятти',
		'Омск',
		'Волгоград',
		'Ставрополь',
		'Краснодар',
		'Воронеж',
		'Уфа',
		'Ярославль',
		'Саратов',
		'Ижевск',
		'Челябинск',
		'Красноярск',
		'Новосибирск',
		'Ачинск',
		'Кемерово',
		'Иркутск',
		'Владивосток',
		'Тюмень',
		'Хабаровск',
		'Пермь',
		'Барнаул',
		'Липецк',
		'Пенза'
	]

	// Формируем данные для вставки с автоматической генерацией slug
	const citiesData = cityNames.map(name => ({
		name,
		slug: slugify(name)
	}))

	// Очищаем таблицу перед добавлением новых записей
	await prisma.city.deleteMany({})
	console.log('Старые города удалены')

	// Вставляем все города одной операцией
	await prisma.city.createMany({
		data: citiesData,
	})

	console.log(`✅ Добавлено ${citiesData.length} городов:`)
	citiesData.forEach(c => console.log(`   ${c.name} → ${c.slug}`))
}

main()
	.catch(e => {
		console.error('❌ Ошибка:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
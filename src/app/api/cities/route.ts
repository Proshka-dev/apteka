// app/api/cities/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
	try {
		const cities = await prisma.city.findMany({
			orderBy: { name: 'asc' },
		})
		return NextResponse.json(cities)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка при загрузке городов' },
			{ status: 500 }
		)
	} finally {
		await prisma.$disconnect()
	}
}